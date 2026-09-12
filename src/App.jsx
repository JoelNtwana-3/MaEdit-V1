import React, { useState } from "react";
import {
  Home,
  Image as ImageIcon,
  Film,
  Sparkles,
  FolderOpen,
  Settings,
  Upload,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  WandSparkles
} from "lucide-react";

function HomePage({ setPage }) {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <div className="eyebrow">MAEDIT V1</div>
          <h1>Your creative studio.<br /><span>Simple. Powerful. Yours.</span></h1>
          <p>Edit photos, create videos and explore AI creativity in one desktop application.</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => setPage("photo")}><ImageIcon size={18}/> Edit photo</button>
            <button className="secondary" onClick={() => setPage("video")}><Film size={18}/> Edit video</button>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-orb orb-one"></div>
          <div className="art-orb orb-two"></div>
          <div className="art-card">
            <WandSparkles size={42}/>
            <strong>Make something original</strong>
            <small>Photo · Video · AI</small>
          </div>
        </div>
      </section>

      <h2>Start creating</h2>
      <div className="feature-grid">
        <Feature title="Photo Editor" text="Tune light, colour and detail." icon={<ImageIcon/>} onClick={() => setPage("photo")} />
        <Feature title="Video Editor" text="Build clips and export your story." icon={<Film/>} onClick={() => setPage("video")} />
        <Feature title="AI Image" text="Turn ideas into images." icon={<Sparkles/>} onClick={() => setPage("ai-image")} />
        <Feature title="AI Video" text="Create motion from prompts." icon={<Sparkles/>} onClick={() => setPage("ai-video")} />
      </div>
    </div>
  );
}

function Feature({ title, text, icon, onClick }) {
  return <button className="feature-card" onClick={onClick}>
    <div className="feature-icon">{icon}</div>
    <div><h3>{title}</h3><p>{text}</p></div>
    <span className="arrow">→</span>
  </button>;
}

function PhotoEditor() {
  const [image, setImage] = useState(null);
  const [values, setValues] = useState({ brightness: 100, contrast: 100, saturation: 100, blur: 0, grayscale: 0, sepia: 0 });
  const update = (key, value) => setValues(v => ({ ...v, [key]: value }));
  const filter = `brightness(${values.brightness}%) contrast(${values.contrast}%) saturate(${values.saturation}%) blur(${values.blur}px) grayscale(${values.grayscale}%) sepia(${values.sepia}%)`;

  function chooseFile(e) {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  }

  return <div className="editor-page">
    <EditorHeader title="Photo Editor" subtitle="Adjust your image with precision." />
    <div className="editor-layout">
      <div className="preview-panel">
        {image ? <img src={image} className="photo-preview" style={{ filter }} /> :
          <label className="dropzone"><Upload size={36}/><strong>Import a photo</strong><span>PNG, JPG or WEBP</span><input type="file" accept="image/*" onChange={chooseFile}/></label>}
      </div>
      <aside className="controls-panel">
        <h3>Adjustments</h3>
        {[
          ["brightness", "Brightness", 0, 200],
          ["contrast", "Contrast", 0, 200],
          ["saturation", "Saturation", 0, 200],
          ["blur", "Blur", 0, 20],
          ["grayscale", "Grayscale", 0, 100],
          ["sepia", "Sepia", 0, 100]
        ].map(([key, label, min, max]) => <label className="range-row" key={key}>
          <span>{label}<b>{values[key]}{key === "blur" ? "px" : "%"}</b></span>
          <input type="range" min={min} max={max} value={values[key]} onChange={e => update(key, Number(e.target.value))}/>
        </label>)}
        <div className="control-actions">
          <label className="secondary button-like"><Upload size={16}/> Replace<input type="file" accept="image/*" onChange={chooseFile}/></label>
          <button className="primary" disabled={!image} onClick={() => alert("Export integration is ready for native implementation.")}><Download size={16}/> Export</button>
        </div>
      </aside>
    </div>
  </div>;
}

function VideoEditor() {
  const [video, setVideo] = useState(null);
  return <div className="editor-page">
    <EditorHeader title="Video Editor" subtitle="Arrange, trim and prepare your next video." />
    <div className="video-workspace">
      <div className="video-preview">
        {video ? <video src={video} controls /> : <label className="dropzone"><Film size={40}/><strong>Import a video</strong><span>MP4, MOV or WEBM</span><input type="file" accept="video/*" onChange={e => e.target.files?.[0] && setVideo(URL.createObjectURL(e.target.files[0]))}/></label>}
      </div>
      <div className="timeline">
        <div className="timeline-head"><strong>Timeline</strong><span>00:00:00 — 00:00:00</span></div>
        <div className="timeline-track"><div className="timeline-clip">Video clip</div></div>
      </div>
      <div className="video-tools">
        <button className="tool-btn">✂ Trim</button>
        <button className="tool-btn">T Text</button>
        <button className="tool-btn">♫ Audio</button>
        <button className="tool-btn">＋ Transition</button>
        <button className="primary export-btn"><Download size={16}/> Export video</button>
      </div>
    </div>
  </div>;
}

function AIImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  return <div className="editor-page">
    <EditorHeader title="AI Image Creator" subtitle="Describe an image and connect your preferred AI model." />
    <div className="ai-layout">
      <div className="ai-form card">
        <div className="ai-label"><Sparkles size={18}/> Prompt</div>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Example: A cinematic sunset over Lake Malawi, highly detailed..." />
        <div className="form-row"><select><option>Local model / API provider</option><option>Stable Diffusion</option><option>ComfyUI</option><option>Custom API</option></select><select><option>1024 × 1024</option><option>768 × 1024</option><option>1024 × 768</option></select></div>
        <button className="primary full" onClick={() => setResult(prompt ? "Generation endpoint ready to connect." : "Enter a prompt first.")}><Sparkles size={17}/> Generate image</button>
        <small className="note">Connect a local model or API in the backend before production use.</small>
      </div>
      <div className="ai-result">{result ? <div className="result-message">{result}</div> : <><Sparkles size={42}/><strong>Your generated image appears here</strong><span>AI output preview</span></>}</div>
    </div>
  </div>;
}

function AIVideoCreator() {
  const [prompt, setPrompt] = useState("");
  return <div className="editor-page">
    <EditorHeader title="AI Video Creator" subtitle="Create short video concepts from text prompts." />
    <div className="ai-layout">
      <div className="ai-form card">
        <div className="ai-label"><Sparkles size={18}/> Video prompt</div>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Example: A smooth aerial shot flying over a green mountain landscape..." />
        <div className="form-row"><select><option>Local video model / API</option><option>ComfyUI workflow</option><option>Custom API</option></select><select><option>5 seconds</option><option>10 seconds</option></select></div>
        <button className="primary full" onClick={() => alert(prompt ? "AI video endpoint ready to connect." : "Enter a prompt first.")}><Sparkles size={17}/> Generate video</button>
        <small className="note">Video generation needs a connected local model or external provider.</small>
      </div>
      <div className="ai-result"><Film size={42}/><strong>Your generated video appears here</strong><span>AI video preview</span></div>
    </div>
  </div>;
}

function Projects() {
  return <div className="page"><div className="page-heading"><div><h1>Projects</h1><p>Your recent creative work.</p></div><button className="primary"><FolderOpen size={17}/> Open folder</button></div><div className="empty-projects"><FolderOpen size={42}/><h3>No projects yet</h3><p>Start editing and your projects will appear here.</p></div></div>;
}

function EditorHeader({ title, subtitle }) {
  return <div className="page-heading"><div><h1>{title}</h1><p>{subtitle}</p></div><span className="version-pill">V1.0</span></div>;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const pages = {
    home: <HomePage setPage={setPage}/>,
    photo: <PhotoEditor/>,
    video: <VideoEditor/>,
    "ai-image": <AIImageCreator/>,
    "ai-video": <AIVideoCreator/>,
    projects: <Projects/>
  };

  return <div className={dark ? "app dark" : "app"}>
    <header className="topbar">
      <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X/> : <Menu/>}</button>
      <div className="brand" onClick={() => setPage("home")}><div className="brand-mark">M</div><span>MaEdit <b>V1</b></span></div>
      <div className="top-actions"><button onClick={() => setDark(!dark)} className="icon-btn">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><div className="avatar">M</div></div>
    </header>
    <div className="body">
      <aside className={mobileNav ? "sidebar open" : "sidebar"}>
        <nav>
          <NavItem icon={<Home/>} label="Home" active={page === "home"} onClick={() => {setPage("home");setMobileNav(false)}}/>
          <div className="nav-section">EDIT</div>
          <NavItem icon={<ImageIcon/>} label="Photo editor" active={page === "photo"} onClick={() => {setPage("photo");setMobileNav(false)}}/>
          <NavItem icon={<Film/>} label="Video editor" active={page === "video"} onClick={() => {setPage("video");setMobileNav(false)}}/>
          <div className="nav-section">AI STUDIO</div>
          <NavItem icon={<Sparkles/>} label="AI image" active={page === "ai-image"} onClick={() => {setPage("ai-image");setMobileNav(false)}}/>
          <NavItem icon={<Sparkles/>} label="AI video" active={page === "ai-video"} onClick={() => {setPage("ai-video");setMobileNav(false)}}/>
          <div className="nav-section">LIBRARY</div>
          <NavItem icon={<FolderOpen/>} label="Projects" active={page === "projects"} onClick={() => {setPage("projects");setMobileNav(false)}}/>
        </nav>
        <div className="sidebar-bottom"><NavItem icon={<Settings/>} label="Settings" onClick={() => alert("Settings panel will be added in the next release.")}/><small>MaEdit V1 · Desktop</small></div>
      </aside>
      <main className="main">{pages[page]}</main>
    </div>
  </div>;
}

function NavItem({ icon, label, active, onClick }) {
  return <button className={active ? "nav-item active" : "nav-item"} onClick={onClick}>{icon}<span>{label}</span></button>;
}