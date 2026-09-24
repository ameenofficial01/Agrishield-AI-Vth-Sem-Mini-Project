import os

# 2. Update LoginPage.tsx
login_path = 'src/pages/LoginPage.tsx'
with open(login_path, 'r') as f:
    content = f.read()

content = content.replace('import { useApp } from "../context/AppContext";',
'''import { useApp } from "../context/AppContext";
import { fetchAPI } from "../utils/api";
import { useState } from "react";''')

content = content.replace('  const { login } = useApp();',
'''  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const data = new URLSearchParams();
      data.append("username", email);
      data.append("password", password);
      
      const res = await fetchAPI('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
      });
      localStorage.setItem("agroshield.token", res.access_token);
      login();
    } catch (e: any) {
      setErrorMsg(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };''')

content = content.replace('<button\n              type="button"\n              onClick={login}', 
'''<button\n              type="button"\n              onClick={handleLogin} disabled={loading}''')

content = content.replace('<button\n            type="button"\n            onClick={login}',
'''<button\n            type="button"\n            onClick={handleLogin} disabled={loading}''')

content = content.replace('Sign In as Admin', '{loading ? "Signing in..." : "Sign In"}')
content = content.replace('Sign In as Farmer', '{loading ? "Signing in..." : "Sign In"}')

content = content.replace('<input\n                type="email"\n                defaultValue="officer@kerala.gov.in"',
'''<input\n                type="email"\n                value={email} onChange={e => setEmail(e.target.value)}''')
content = content.replace('<input\n                type="password"\n                defaultValue="demo123"',
'''<input\n                type="password"\n                value={password} onChange={e => setPassword(e.target.value)}''')

with open(login_path, 'w') as f:
    f.write(content)
print("Updated LoginPage.tsx")
