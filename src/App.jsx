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

function ToolSection({ title, children, open = false }) {
  const [expanded, setExpanded] = useState(open);
  return <section className="tool-section">
    <button className="tool-section-head" onClick={() => setExpanded(!expanded)}>
      <span><b>{title}</b></span><span>{expanded ? "−" : "+"}</span>
    </button>
    {expanded && <div className="tool-section-body">{children}</div>}
  </section>;
}

function Slider({ label, value, min, max, step = 1, onChange }) {
  return <label className="range-row">
    <span>{label}<b>{Number(value).toFixed(step < 1 ? 1 : 0)}</b></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}/>
  </label>;
}

const photoDefaults = {exposure:0,contrast:0,highlights:0,shadows:0,whites:0,blacks:0,temperature:0,tint:0,saturation:0,vibrance:0,hue:0,sharpening:0,noise:0,denoise:0,texture:0,clarity:0,dehaze:0,vignette:0,grain:0,rotate:0,crop:100};

function PhotoEditor() {
  const [image,setImage]=useState(null);
  const [values,setValues]=useState(photoDefaults);
  const [mask,setMask]=useState("None");
  const update=(key,value)=>setValues(v=>({...v,[key]:value}));
  const reset=()=>setValues(photoDefaults);
  const filter=`brightness(${Math.max(0,100+values.exposure*8+values.shadows*.25+values.whites*.15)}%) contrast(${Math.max(0,100+values.contrast+values.blacks*.15)}%) saturate(${Math.max(0,100+values.saturation+values.vibrance*.55)}%) hue-rotate(${values.hue}deg)`;
  function chooseFile(e){const file=e.target.files?.[0];if(file)setImage(URL.createObjectURL(file));}
  const masks=["AI Subject","AI Sky","AI Background","Brush","Linear Gradient","Radial Gradient","Color Range","Luminance Range","Depth Range"];

  return <div className="editor-page">
    <EditorHeader title="Photo Editor" subtitle="Lightroom-inspired professional photo controls." />
    <div className="editor-layout">
      <div className="preview-panel">
        {image?<div className="photo-stage" style={{transform:`rotate(${values.rotate}deg)`}}><img src={image} className="photo-preview" style={{filter}}/></div>:
        <label className="dropzone"><Upload size={36}/><strong>Import a photo</strong><span>PNG, JPG or WEBP</span><input type="file" accept="image/*" onChange={chooseFile}/></label>}
        {mask!=="None"&&image&&<div className="mask-badge">Mask: {mask}</div>}
      </div>
      <aside className="controls-panel pro-controls">
        <div className="panel-toolbar"><strong>Editing Tools</strong><button className="icon-btn" onClick={reset}>↺</button></div>

        <ToolSection title="1. Light & Exposure" open>
          <Slider label="Exposure" value={values.exposure} min={-5} max={5} step={.1} onChange={v=>update("exposure",v)}/>
          <Slider label="Contrast" value={values.contrast} min={-100} max={100} onChange={v=>update("contrast",v)}/>
          <Slider label="Highlights" value={values.highlights} min={-100} max={100} onChange={v=>update("highlights",v)}/>
          <Slider label="Shadows" value={values.shadows} min={-100} max={100} onChange={v=>update("shadows",v)}/>
          <Slider label="Whites" value={values.whites} min={-100} max={100} onChange={v=>update("whites",v)}/>
          <Slider label="Blacks" value={values.blacks} min={-100} max={100} onChange={v=>update("blacks",v)}/>
          <div className="tool-chip-row"><button className="tool-chip">RGB Curve</button><button className="tool-chip">Point Curve</button></div>
        </ToolSection>

        <ToolSection title="2. Color Adjustments">
          <Slider label="White Balance Temp" value={values.temperature} min={-100} max={100} onChange={v=>update("temperature",v)}/>
          <Slider label="Tint" value={values.tint} min={-100} max={100} onChange={v=>update("tint",v)}/>
          <Slider label="Saturation" value={values.saturation} min={-100} max={100} onChange={v=>update("saturation",v)}/>
          <Slider label="Vibrance" value={values.vibrance} min={-100} max={100} onChange={v=>update("vibrance",v)}/>
          <div className="tool-chip-row">{["HSL Mixer","Color Grading Wheels","Color Calibration"].map(x=><button className="tool-chip" key={x}>{x}</button>)}</div>
        </ToolSection>

        <ToolSection title="3. Detail & Optics">
          <Slider label="Sharpening" value={values.sharpening} min={0} max={150} onChange={v=>update("sharpening",v)}/>
          <Slider label="Noise Reduction" value={values.noise} min={0} max={100} onChange={v=>update("noise",v)}/>
          <Slider label="AI Denoise" value={values.denoise} min={0} max={100} onChange={v=>update("denoise",v)}/>
          <Slider label="Texture" value={values.texture} min={-100} max={100} onChange={v=>update("texture",v)}/>
          <Slider label="Clarity" value={values.clarity} min={-100} max={100} onChange={v=>update("clarity",v)}/>
          <Slider label="Dehaze" value={values.dehaze} min={-100} max={100} onChange={v=>update("dehaze",v)}/>
          <Slider label="Vignette" value={values.vignette} min={-100} max={100} onChange={v=>update("vignette",v)}/>
          <Slider label="Grain" value={values.grain} min={0} max={100} onChange={v=>update("grain",v)}/>
          <div className="tool-chip-row"><button className="tool-chip">Lens Profile Corrections</button><button className="tool-chip">Chromatic Aberration</button></div>
        </ToolSection>

        <ToolSection title="4. Selective Masking & AI">
          <div className="mask-grid">{masks.map(name=><button key={name} className={mask===name?"mask-btn active":"mask-btn"} onClick={()=>setMask(name)}>{name}</button>)}</div>
          <small className="note">Masking controls are exposed. AI selection requires a connected image-processing backend.</small>
        </ToolSection>

        <ToolSection title="5. Retouching & Geometry">
          <Slider label="Crop / Scale" value={values.crop} min={50} max={100} onChange={v=>update("crop",v)}/>
          <Slider label="Rotate / Straighten" value={values.rotate} min={-180} max={180} onChange={v=>update("rotate",v)}/>
          <div className="tool-chip-row">{["Heal","Clone","AI Content-Aware Remove","Crop","Aspect Ratio","Geometry / Upright"].map(x=><button className="tool-chip" key={x}>{x}</button>)}</div>
        </ToolSection>

        <ToolSection title="6. Presets & Profiles">
          <div className="tool-chip-row">{["Adobe Raw Profiles","Creative Profiles","Custom Presets","Import Presets","Adaptive AI Presets"].map(x=><button className="tool-chip" key={x}>{x}</button>)}</div>
        </ToolSection>

        <div className="control-actions">
          <label className="secondary button-like"><Upload size={16}/> Replace<input type="file" accept="image/*" onChange={chooseFile}/></label>
          <button className="primary" disabled={!image} onClick={()=>alert("Export pipeline is ready for native implementation.")}><Download size={16}/> Export</button>
        </div>
      </aside>
    </div>
  </div>;
}

const videoDefaults={brightness:0,contrast:0,saturation:0,exposure:0,hue:0,speed:1,trimStart:0,trimEnd:100};

function VideoEditor() {
  const [video,setVideo]=useState(null);
  const [playing,setPlaying]=useState(false);
  const [values,setValues]=useState(videoDefaults);
  const [activeTool,setActiveTool]=useState("Basic");
  const [message,setMessage]=useState("");
  const videoRef=React.useRef(null);
  const update=(key,value)=>setValues(v=>({...v,[key]:value}));
  const videoFilter=`brightness(${100+values.brightness+values.exposure*8}%) contrast(${100+values.contrast}%) saturate(${100+values.saturation}%) hue-rotate(${values.hue}deg)`;
  function chooseVideo(e){const file=e.target.files?.[0];if(file)setVideo(URL.createObjectURL(file));}
  function togglePlay(){if(!videoRef.current)return;if(videoRef.current.paused){videoRef.current.play();setPlaying(true)}else{videoRef.current.pause();setPlaying(false)}}
  function selectTool(name){setActiveTool(name);setMessage(`${name} selected`);}
  const groups=[
    ["Basic","Basic Color Correction","Brightness · Contrast · Saturation · Exposure"],
    ["HSL","HSL Adjustments & Curves","HSL · Curves · Auto-Enhance"],
    ["Cutout","AI & Smart Cutout","Auto Cutout · Chroma Key · Custom Cutout · Smart Tracking"],
    ["Text","Text & Captions","Auto Captions · Auto Lyrics · Templates · TTS · Text Effects"],
    ["Audio","Audio & Sound","Extraction · Noise Reduction · Voice Effects · Auto-Beats · Music/SFX"],
    ["Effects","Visual Enhancement","Filters · Retro · Glitch · Transitions · Keyframes · Speed Ramps"],
    ["Retouch","Body & Face Retouch","Smooth Skin · Face Reshape · Body Reshape · Makeup · Relight"]
  ];
  return <div className="editor-page">
    <EditorHeader title="Video Editor" subtitle="CapCut-inspired timeline, trim, effects, captions and audio tools." />
    <div className="video-workspace">
      <div className="video-preview">
        {video?<video ref={videoRef} src={video} controls style={{filter:videoFilter}} onEnded={()=>setPlaying(false)}/>:
        <label className="dropzone"><Film size={40}/><strong>Import a video</strong><span>MP4, MOV or WEBM</span><input type="file" accept="video/*" onChange={chooseVideo}/></label>}
      </div>
      <div className="video-toolbar">
        <button className="tool-btn" disabled={!video} onClick={togglePlay}>{playing?"Pause":"Play"}</button>
        <button className="tool-btn" onClick={()=>selectTool("Cut / Split")}>✂ Cut / Split</button>
        <button className="tool-btn" onClick={()=>selectTool("Freeze Frame")}>Freeze Frame</button>
        <button className="tool-btn" onClick={()=>selectTool("Reverse")}>Reverse</button>
        <button className="tool-btn" onClick={()=>selectTool("Canvas / Aspect Ratio")}>Canvas / Aspect Ratio</button>
        <label className="tool-btn speed-select">Speed
          <select value={values.speed} onChange={e=>{const v=Number(e.target.value);update("speed",v);if(videoRef.current)videoRef.current.playbackRate=v}}>
            <option value=".25">0.25x</option><option value=".5">0.5x</option><option value="1">1x</option><option value="1.5">1.5x</option><option value="2">2x</option><option value="3">3x</option>
          </select>
        </label>
      </div>
      <div className="timeline advanced-timeline">
        <div className="timeline-head"><strong>Timeline & Trim</strong><span>Start {values.trimStart}% · End {values.trimEnd}%</span></div>
        <Slider label="Trim start" value={values.trimStart} min={0} max={95} onChange={v=>update("trimStart",v)}/>
        <Slider label="Trim end" value={values.trimEnd} min={5} max={100} onChange={v=>update("trimEnd",v)}/>
        <div className="timeline-track"><div className="timeline-clip" style={{marginLeft:`${values.trimStart*.7}%`,width:`${Math.max(5,(values.trimEnd-values.trimStart)*.7)}%`}}>Video clip</div></div>
      </div>
      <div className="video-tools-grid">{groups.map(([id,title,text])=><button key={id} className={activeTool===id?"video-tool-card active":"video-tool-card"} onClick={()=>selectTool(id)}><strong>{title}</strong><span>{text}</span></button>)}</div>
      <div className="video-tool-panel">
        <div className="panel-toolbar"><strong>{activeTool} Tools</strong><span className="version-pill">V1</span></div>
        {activeTool==="Basic"&&<div className="tool-control-grid">
          <Slider label="Brightness" value={values.brightness} min={-100} max={100} onChange={v=>update("brightness",v)}/>
          <Slider label="Contrast" value={values.contrast} min={-100} max={100} onChange={v=>update("contrast",v)}/>
          <Slider label="Saturation" value={values.saturation} min={-100} max={100} onChange={v=>update("saturation",v)}/>
          <Slider label="Exposure" value={values.exposure} min={-5} max={5} step={.1} onChange={v=>update("exposure",v)}/>
        </div>}
        {activeTool==="HSL"&&<div className="tool-chip-row large">{["HSL Mixer","Curves","Auto-Enhance"].map(x=><button className="tool-chip" key={x}>{x}</button>)}</div>}
        {activeTool==="Cutout"&&<div className="tool-chip-row large">{["Auto Cutout / Background Remover","Chroma Key / Green Screen","Custom Cutout","AI Body Effects","Smart Tracking","Motion Tracking"].map(x=><button className="tool-chip" key={x} onClick={()=>setMessage(x+" selected")}>{x}</button>)}</div>}
        {activeTool==="Text"&&<div className="tool-chip-row large">{["Auto Captions","Auto Lyrics","Text Templates","Text-to-Speech","Text Effects","In Animation","Out Animation","Combo Animations"].map(x=><button className="tool-chip" key={x} onClick={()=>setMessage(x+" selected")}>{x}</button>)}</div>}
        {activeTool==="Audio"&&<div className="tool-chip-row large">{["Audio Extraction","Noise Reduction","Voice Changer / Effects","Auto-Beats Detection","Royalty-free Music Library","Sound Effects Library"].map(x=><button className="tool-chip" key={x} onClick={()=>setMessage(x+" selected")}>{x}</button>)}</div>}
        {activeTool==="Effects"&&<div className="tool-chip-row large">{["Filters","Trend","Retro","Distortion","Glitch","Transitions","Keyframe Animations","Speed Ramps"].map(x=><button className="tool-chip" key={x} onClick={()=>setMessage(x+" selected")}>{x}</button>)}</div>}
        {activeTool==="Retouch"&&<div className="tool-chip-row large">{["Smooth Skin","Face Reshape","Body Reshape","Makeup Filters","Relight"].map(x=><button className="tool-chip" key={x} onClick={()=>setMessage(x+" selected")}>{x}</button>)}</div>}
        {message&&<div className="result-message tool-message">{message}</div>}
      </div>
      <div className="video-tools"><button className="primary export-btn"><Download size={16}/> Export video</button></div>
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