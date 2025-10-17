import { useState, useEffect } from "react";
import { login, getFeed, createPost } from "./api";
import './App.css'



export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feed, setFeed] = useState([]);
  const [description, setDescription] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const r = await login(email, password);
    alert(r.mensaje || "ok");
  };

  const loadFeed = async () => {
    const r = await getFeed();
    setFeed(r.data || []);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const r = await createPost(description);
    alert(r.mensaje || "ok");
    setDescription("");
    loadFeed();
  };

  useEffect(() => { loadFeed(); }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Hommie</h1>

      <form onSubmit={handleLogin} style={{ marginBottom: 16 }}>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button>Login</button>
      </form>

      <form onSubmit={handleCreate} style={{ marginBottom: 16 }}>
        <input placeholder="¿Qué estás pensando?" value={description} onChange={e=>setDescription(e.target.value)} />
        <button>Publicar</button>
      </form>

      <ul>
        {feed.map((p, i) => <li key={p._id || i}>{p.description}</li>)}
      </ul>
    </div>
  );
}


