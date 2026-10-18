/** Secure one-time CLI provisioning: no password is saved to source or deployed to browsers. */
import {createClient} from '@supabase/supabase-js';
import {createInterface} from 'node:readline';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
const email=(process.env.NEXT_PUBLIC_KTCC_ADMIN_EMAIL||'').trim().toLowerCase();
if(!url||!secret||!email||!email.includes('@')){
 console.error('Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_KTCC_ADMIN_EMAIL.');process.exit(1);
}
let rl;
async function hiddenPrompt(question){
 if(!process.stdin.isTTY)throw new Error('Run this bootstrap in an interactive terminal.');
 process.stdout.write(question);
 process.stdin.setRawMode(true);process.stdin.resume();
 try{return await new Promise(resolve=>{let input='';const onData=(chunk)=>{const str=chunk.toString();for(const c of str){if(c==='\r'||c==='\n'){process.stdin.off('data',onData);process.stdout.write('\n');resolve(input);return;}if(c==='\u0003'){process.exit(130)}if(c==='\u007f'){input=input.slice(0,-1);}else{input+=c;}}};process.stdin.on('data',onData);});}
 finally{process.stdin.setRawMode(false);}
}
try{
 const password=await hiddenPrompt('Password untuk username admin: ');
 if(password.length<12)throw Error('Gunakan password minimum 12 karakter.');
 rl=createInterface({input:process.stdin,output:process.stdout,terminal:Boolean(process.stdin.isTTY)});
 const answer=await new Promise(r=>rl.question(`Buat/perbarui administrator Supabase ${email}? Ketik YA: `,r));
 if(answer!=='YA'){console.log('Dibatalkan.');process.exit(0)}
 const supabase=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
 const users=await supabase.auth.admin.listUsers({page:1,perPage:1000});if(users.error)throw users.error;
 let user=users.data.users.find(u=>u.email?.toLowerCase()===email);
 if(user){const updated=await supabase.auth.admin.updateUserById(user.id,{password,email_confirm:true});if(updated.error)throw updated.error;}
 else{const created=await supabase.auth.admin.createUser({email,password,email_confirm:true,user_metadata:{full_name:'KTCC Administrator'}});if(created.error)throw created.error;user=created.data.user;}
 if(!user)throw Error('User provisioning failed');
 const {error}=await supabase.from('profiles').upsert({id:user.id,display_name:'KTCC Administrator',role:'admin'},{onConflict:'id'});
 if(error)throw error;
 console.log('Admin siap. Masuk di /admin/login dengan username admin dan password yang Anda masukkan.');
}catch(error){console.error(error instanceof Error?error.message:error);process.exitCode=1;}finally{rl?.close();}
