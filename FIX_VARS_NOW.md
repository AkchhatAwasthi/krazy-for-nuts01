# 🚨 Immediate Action Required: Add Missing Keys

Great news! The error screen confirms your app is deployed and working, but it's just missing its "keys" to talk to the database.

## 1️⃣ Where to finding the Keys

You need to find the values for these two variables. Look in your local project folder for a file named `.env`.

Open it with a text editor (Notepad, VS Code, etc.). You should see something like this:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

*If you can't find the .env file, you can get these from your Supabase Dashboard -> Project Settings -> API.*

## 2️⃣ Where to Add Them (Netlify)

1.  Log in to [Netlify](https://app.netlify.com/).
2.  Click on your site ("krazy-for-nuts" or similar).
3.  Click on **Site configuration** (or "Site settings").
4.  On the sidebar, click **Environment variables**.
5.  Click **Add a variable** -> **Add a single variable**.

## 3️⃣ What to Add

Add these two variables exactly as written (copy the names):

| Key (Name) | Value |
| :--- | :--- |
| `VITE_SUPABASE_URL` | *(Paste the URL starting with https://...)* |
| `VITE_SUPABASE_ANON_KEY` | *(Paste the long key string)* |

**Note:** You do NOT need quotes (" ") around the values.

## 4️⃣ Final Step: Redeploy

After adding the variables, they won't work until the site sends them to the browser.

1.  Go to the **Deploys** tab in Netlify.
2.  Click **Trigger deploy** -> **Deploy site**.
3.  Wait for it to say "Published" (about 1-2 minutes).
4.  Refresh your website.

**The error screen should disappear and your site should load!**
