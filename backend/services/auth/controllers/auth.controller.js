import { supabase } from '../config/supabaseClient.js'
// import { createUser } from '../services/user.service.js' // Uncomment when user service is ready

// signUp
export async function signUpWithEmail(req, res){
    const { email, password } = req.body || {};
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const {data, error} = await supabase.auth.signUp({
        email: email, 
        password: password,
    })

    if(error){
        console.log("Error signing up", error.message)
        return res.status(400).json({ error: error.message });
    }
    
    console.log("User signed up successfully", data)
    return res.status(200).json({ data });
}

// signIn
export async function signInWithEmail(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    console.error("Error signing in:", error.message)
    return res.status(400).json({ error: error.message });
  }
  console.log("User logged in:", data)
  return res.status(200).json({ data });
}

// googleauthsignin
export async function signInWithGoogle(req, res) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/dashboard', 
    }
  })

  if (error) {
    console.error("Error signing in with Google:", error.message)
    return res.status(400).json({ error: error.message });
  }
  
  // Return the URL for the frontend to redirect the user to
  return res.status(200).json({ data });
}

// signout
export async function signOut(req, res){
  const {error}=await supabase.auth.signOut();

  if(error){
    console.error("Error signing out:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log("Successfully signed out");
  return res.status(200).json({ message: "Successfully signed out" });
}

// get session
export async function getUserSession(req, res){
  const {data:{session}, error}=await supabase.auth.getSession();

  if(sessionError){
    return res.status(400).json({ error: sessionError.message });
  }

  const {data:{user}, error:userError}=await supabase.auth.getUser();

  if(userError){
    return res.status(400).json({ error: userError.message });
  }

  return res.status(200).json({ user, session });
}