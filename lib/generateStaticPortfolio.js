// Generates a self-contained static HTML portfolio page
// Each template is reproduced as pure HTML + inline CSS (no React/JS dependencies)

export function generateStaticPortfolio(resumeData, templateId = 'classic') {
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = '' } = resumeData || {};
    const skillsList = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    const initials = (personalInfo.fullName || 'U').split(' ').map(n => n[0]).join('').toUpperCase();
    const year = new Date().getFullYear();
    const name = personalInfo.fullName || 'Your Name';
    const title = personalInfo.jobTitle || '';
    const summary = personalInfo.summary || '';
    const email = personalInfo.email || '';
    const phone = personalInfo.phone || '';
    const address = personalInfo.address || '';
    const linkedin = personalInfo.linkedin || '';
    const website = personalInfo.website || '';
    const photo = personalInfo.photo || '';

    // Helper to escape HTML
    const esc = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    // Helper to make URL absolute
    const absUrl = (url) => url && !url.startsWith('http') ? `https://${url}` : url;

    // Photo HTML
    const photoCircle = (size, extraStyle = '') => photo
        ? `<img src="${esc(photo)}" alt="${esc(name)}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;${extraStyle}" />`
        : `<div style="width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${Math.floor(size / 3)}px;${extraStyle}">${esc(initials)}</div>`;

    const photoSquare = (size, extraStyle = '') => photo
        ? `<img src="${esc(photo)}" alt="${esc(name)}" style="width:${size}px;height:${size}px;border-radius:8px;object-fit:cover;${extraStyle}" />`
        : `<div style="width:${size}px;height:${size}px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${Math.floor(size / 3)}px;${extraStyle}">${esc(initials)}</div>`;

    // Skills badges
    const skillBadges = (bg, color) => skillsList.map(s =>
        `<span style="background:${bg};color:${color};font-size:12px;font-weight:600;padding:4px 12px;border-radius:9999px;display:inline-block;margin:4px">${esc(s)}</span>`
    ).join('');

    // Shared nav JS for smooth scrolling
    const navScript = `<script>
function scrollTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'});}
document.addEventListener('DOMContentLoaded',function(){
  var mb=document.querySelector('.mobile-menu-btn');
  var mm=document.querySelector('.mobile-menu');
  if(mb&&mm){mb.addEventListener('click',function(){mm.style.display=mm.style.display==='block'?'none':'block';});}
});
</script>`;

    // Build nav items based on data
    const navIds = [
        ['home', 'Home'],
        ...(skillsList.length > 0 ? [['skills', 'Skills']] : []),
        ...(experience.length > 0 || education.length > 0 ? [['experience', 'Experience']] : []),
        ...(projects.length > 0 ? [['projects', 'Projects']] : []),
        ['contact', 'Contact'],
    ];

    const responsiveCSS = `
    <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{-webkit-font-smoothing:antialiased;}
    a{transition:opacity 0.2s;}a:hover{opacity:0.85;}
    .desktop-nav{display:flex;}.mobile-menu-btn{display:none;}.mobile-menu{display:none;}
    @media(max-width:768px){.desktop-nav{display:none !important;}.mobile-menu-btn{display:block !important;}}
    @media(min-width:769px){.mobile-menu-btn{display:none !important;}.mobile-menu{display:none !important;}}
    </style>`;

    // ===== TEMPLATE GENERATORS =====

    if (templateId === 'dark') return generateDark();
    if (templateId === 'minimal') return generateMinimal();
    if (templateId === 'gradient') return generateGradient();
    if (templateId === 'developer') return generateDev();
    return generateClassic();

    // ========== CLASSIC ==========
    function generateClassic() {
        return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)} — Portfolio</title>${responsiveCSS}
<style>body{font-family:system-ui,-apple-system,sans-serif;background:linear-gradient(to bottom,#fff7e6,#fff 50%);min-height:100vh;}</style></head><body>
<header style="position:sticky;top:0;z-index:50;background:#1e293b;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)">
<div style="max-width:1024px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between;height:64px">
<nav class="desktop-nav" style="display:flex;gap:4px">${navIds.map(([id, label]) => `<button onclick="scrollTo('${id}')" style="padding:8px 12px;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;background:none;border:none;color:#d1d5db;font-family:inherit">${label}</button>`).join('')}</nav>
<button class="mobile-menu-btn" style="background:none;border:none;color:#9ca3af;cursor:pointer;padding:8px;font-size:20px">☰</button>
</div>
<div class="mobile-menu" style="background:#1e293b;padding:8px 12px 12px">${navIds.map(([id, label]) => `<button onclick="scrollTo('${id}')" style="display:block;width:100%;text-align:left;padding:10px 12px;border-radius:6px;font-size:16px;font-weight:500;border:none;cursor:pointer;color:#d1d5db;background:transparent;font-family:inherit">${label}</button>`).join('')}</div>
</header>
<main style="max-width:1024px;margin:0 auto;padding:0 16px">
<section id="home" style="padding:48px 0 32px">
<div style="padding:32px;display:flex;flex-wrap:wrap;align-items:center;gap:32px;justify-content:center">
${photoCircle(160, 'border:4px solid #e5e7eb;flex-shrink:0;' + (photo ? '' : 'background:#f3f4f6;color:#9ca3af'))}
<div style="flex:1;min-width:280px">
<h1 style="font-size:30px;font-weight:700;color:#1f2937;margin-bottom:8px">Hello, I'm <span style="color:#ea580c">${esc(name)}</span></h1>
<p style="color:#4b5563;margin-bottom:12px">${esc(title)}${address ? ` | ${esc(address)}` : ''}</p>
${summary ? `<p style="color:#374151;margin-bottom:16px;max-width:560px;line-height:1.7">${esc(summary)}</p>` : ''}
${skillsList.length > 0 ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">${skillsList.slice(0, 6).map(s => `<span style="background:#ffedd5;color:#9a3412;font-size:12px;font-weight:600;padding:4px 12px;border-radius:9999px">${esc(s)}</span>`).join('')}</div>` : ''}
<div style="display:flex;flex-wrap:wrap;gap:12px">
${linkedin ? `<a href="${esc(absUrl(linkedin))}" target="_blank" rel="noopener" style="padding:10px 16px;background:#2563eb;color:#fff;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px">LinkedIn</a>` : ''}
${website ? `<a href="${esc(absUrl(website))}" target="_blank" rel="noopener" style="padding:10px 16px;background:#16a34a;color:#fff;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px">Website</a>` : ''}
</div></div></div></section>

${skillsList.length > 0 ? `<section id="skills" style="padding:32px 0">
<h2 style="font-size:30px;font-weight:700;color:#1f2937;margin-bottom:32px;text-align:center">Skills</h2>
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px">${skillBadges('#ffedd5', '#9a3412')}</div></section>` : ''}

${(experience.length > 0 || education.length > 0) ? `<section id="experience" style="padding:32px 0">
${education.length > 0 ? `<h2 style="font-size:30px;font-weight:700;color:#1f2937;margin-bottom:32px;text-align:center">Education</h2>
<div style="position:relative;padding-left:32px;margin-bottom:48px">${education.map((edu, i) => `<div style="position:relative;padding-bottom:32px;padding-left:24px">
${i < education.length - 1 ? '<div style="position:absolute;left:-1px;top:12px;bottom:0;width:2px;background:#cbd5e1"></div>' : ''}
<div style="position:absolute;left:-8px;top:6px;width:16px;height:16px;border-radius:50%;background:#f97316;border:4px solid #f8fafc;box-sizing:content-box"></div>
<div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:4px"><div style="font-size:20px;font-weight:700;color:#1f2937">${esc(edu.degree)}</div><span style="font-size:12px;font-weight:600;color:#6b7280">${esc(edu.startDate)} — ${esc(edu.endDate)}</span></div>
<div style="font-size:16px;font-weight:600;color:#4b5563">${esc(edu.school)}</div></div>`).join('')}</div>` : ''}
${experience.length > 0 ? `<h2 style="font-size:30px;font-weight:700;color:#1f2937;margin-bottom:32px;text-align:center">Work Experience</h2>
<div style="position:relative;padding-left:32px">${experience.map((exp, i) => `<div style="position:relative;padding-bottom:32px;padding-left:24px">
${i < experience.length - 1 ? '<div style="position:absolute;left:-1px;top:12px;bottom:0;width:2px;background:#cbd5e1"></div>' : ''}
<div style="position:absolute;left:-8px;top:6px;width:16px;height:16px;border-radius:50%;background:#f97316;border:4px solid #f8fafc;box-sizing:content-box"></div>
<div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:4px"><div style="font-size:20px;font-weight:700;color:#1f2937">${esc(exp.title)}</div><span style="font-size:12px;font-weight:600;color:#2563eb;background:#dbeafe;padding:2px 10px;border-radius:9999px">${esc(exp.startDate)} — ${esc(exp.endDate)}</span></div>
<div style="font-size:16px;font-weight:600;color:#4b5563;margin-bottom:12px">${esc(exp.company)}</div>
${exp.description ? `<p style="color:#374151;line-height:1.8;white-space:pre-line">${esc(exp.description)}</p>` : ''}</div>`).join('')}</div>` : ''}
</section>` : ''}

${projects.length > 0 ? `<section id="projects" style="padding:32px 0">
<h2 style="font-size:30px;font-weight:700;color:#1f2937;margin-bottom:32px;text-align:center">My Projects</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:32px">${projects.map(p => `<div style="padding:24px">
<h3 style="font-size:24px;font-weight:700;color:#ea580c;margin-bottom:12px">${esc(p.name)}</h3>
${p.description ? `<p style="color:#374151;margin-bottom:24px;line-height:1.7">${esc(p.description)}</p>` : ''}
${p.technologies ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">${p.technologies.split(',').map(t => `<span style="background:#ffedd5;color:#9a3412;font-size:12px;font-weight:600;padding:4px 12px;border-radius:9999px">${esc(t.trim())}</span>`).join('')}</div>` : ''}
${p.link ? `<a href="${esc(absUrl(p.link))}" target="_blank" rel="noopener" style="color:#4b5563;font-weight:600;text-decoration:none;font-size:14px">View Project →</a>` : ''}
</div>`).join('')}</div></section>` : ''}

<section id="contact" style="padding:32px 0 48px">
<h2 style="font-size:30px;font-weight:700;color:#1f2937;margin-bottom:32px;text-align:center">Get In Touch</h2>
<div style="display:flex;flex-direction:column;gap:16px;max-width:500px;margin:0 auto">
${email ? `<div style="display:flex;align-items:center;gap:12px;color:#374151">📧 <a href="mailto:${esc(email)}" style="color:#374151;text-decoration:none">${esc(email)}</a></div>` : ''}
${phone ? `<div style="display:flex;align-items:center;gap:12px;color:#374151">📱 ${esc(phone)}</div>` : ''}
${address ? `<div style="display:flex;align-items:center;gap:12px;color:#374151">📍 ${esc(address)}</div>` : ''}
</div></section>
</main>
<footer style="background:#1f2937;color:#e5e7eb;padding:24px 0;text-align:center"><p>© ${year} ${esc(name)}</p></footer>
${navScript}</body></html>`;
    }

    // ========== DARK ==========
    function generateDark() {
        return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)} — Portfolio</title>${responsiveCSS}
<style>body{font-family:'Inter',system-ui,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh;}</style></head><body>
<header style="position:sticky;top:0;z-index:50;background:rgba(15,23,42,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(56,189,248,0.1)">
<div style="max-width:1100px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:64px">
<span style="font-weight:700;font-size:18px;color:#38bdf8">${esc(name.split(' ')[0])}</span>
<nav class="desktop-nav" style="display:flex;gap:4px">${navIds.map(([id, label]) => `<button onclick="scrollTo('${id}')" style="padding:8px 16px;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;background:none;border:none;color:#94a3b8;font-family:inherit">${label}</button>`).join('')}</nav>
<button class="mobile-menu-btn" style="background:none;border:none;color:#94a3b8;cursor:pointer;padding:8px;font-size:20px">☰</button>
</div>
<div class="mobile-menu" style="background:#0f172a;padding:8px 16px 16px">${navIds.map(([id, l]) => `<button onclick="scrollTo('${id}')" style="display:block;width:100%;text-align:left;padding:10px 12px;border-radius:8px;font-size:16px;border:none;cursor:pointer;color:#94a3b8;background:transparent;font-family:inherit">${l}</button>`).join('')}</div>
</header>
<main style="max-width:1100px;margin:0 auto;padding:0 24px">
<section id="home" style="padding:80px 0 60px;text-align:center">
${photoCircle(140, 'border:3px solid #38bdf8;margin:0 auto 24px;display:' + (photo ? 'block' : 'flex') + ';' + (photo ? '' : 'background:#1e293b;color:#38bdf8'))}
<h1 style="font-size:42px;font-weight:800;margin-bottom:8px;color:#f1f5f9">${esc(name)}</h1>
${title ? `<p style="font-size:20px;color:#38bdf8;font-weight:500;margin-bottom:16px">${esc(title)}</p>` : ''}
${summary ? `<p style="font-size:16px;color:#94a3b8;max-width:600px;margin:0 auto 24px;line-height:1.7">${esc(summary)}</p>` : ''}
<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-top:24px">
${email ? `<a href="mailto:${esc(email)}" style="padding:10px 20px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.3);border-radius:8px;color:#38bdf8;text-decoration:none;font-size:14px">${esc(email)}</a>` : ''}
${linkedin ? `<a href="${esc(absUrl(linkedin))}" target="_blank" style="padding:10px 20px;background:#38bdf8;border-radius:8px;color:#0f172a;text-decoration:none;font-size:14px;font-weight:700">LinkedIn</a>` : ''}
</div></section>

${skillsList.length > 0 ? `<section id="skills" style="padding:48px 0"><h2 style="font-size:28px;font-weight:700;color:#f1f5f9;margin-bottom:32px;text-align:center">Skills</h2>
<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">${skillsList.map(s => `<span style="padding:10px 20px;background:rgba(30,41,59,0.6);border:1px solid rgba(56,189,248,0.15);border-radius:10px;color:#cbd5e1;font-size:14px">${esc(s)}</span>`).join('')}</div></section>` : ''}

${experience.length > 0 ? `<section id="experience" style="padding:48px 0"><h2 style="font-size:28px;font-weight:700;color:#f1f5f9;margin-bottom:32px;text-align:center">Experience</h2>
${experience.map(exp => `<div style="background:rgba(30,41,59,0.5);border-radius:16px;padding:24px;border:1px solid rgba(56,189,248,0.08);border-left:3px solid #38bdf8;margin-bottom:16px">
<div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:8px"><h3 style="font-size:18px;font-weight:700;color:#f1f5f9">${esc(exp.title)}</h3><span style="font-size:13px;color:#38bdf8">${esc(exp.startDate)} — ${esc(exp.endDate)}</span></div>
<p style="color:#64748b;font-weight:600;margin-bottom:8px">${esc(exp.company)}</p>
${exp.description ? `<p style="color:#94a3b8;line-height:1.7;white-space:pre-line">${esc(exp.description)}</p>` : ''}</div>`).join('')}</section>` : ''}

${education.length > 0 ? `<div style="padding:0 0 48px"><h2 style="font-size:28px;font-weight:700;color:#f1f5f9;margin-bottom:32px;text-align:center">Education</h2>
${education.map(edu => `<div style="background:rgba(30,41,59,0.5);border-radius:16px;padding:24px;border:1px solid rgba(129,140,248,0.08);border-left:3px solid #818cf8;margin-bottom:16px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center">
<div><h3 style="font-size:18px;font-weight:700;color:#f1f5f9">${esc(edu.degree)}</h3><p style="color:#64748b">${esc(edu.school)}</p></div>
<span style="font-size:13px;color:#818cf8">${esc(edu.startDate)} — ${esc(edu.endDate)}</span></div>`).join('')}</div>` : ''}

${projects.length > 0 ? `<section id="projects" style="padding:48px 0"><h2 style="font-size:28px;font-weight:700;color:#f1f5f9;margin-bottom:32px;text-align:center">Projects</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px">${projects.map(p => `<div style="background:rgba(30,41,59,0.5);border-radius:16px;padding:24px;border:1px solid rgba(56,189,248,0.08)">
<h3 style="font-size:20px;font-weight:700;color:#38bdf8;margin-bottom:8px">${esc(p.name)}</h3>
${p.description ? `<p style="color:#94a3b8;line-height:1.6;margin-bottom:16px">${esc(p.description)}</p>` : ''}
${p.technologies ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">${p.technologies.split(',').map(t => `<span style="background:rgba(56,189,248,0.1);color:#38bdf8;padding:3px 10px;border-radius:6px;font-size:12px">${esc(t.trim())}</span>`).join('')}</div>` : ''}
${p.link ? `<a href="${esc(absUrl(p.link))}" target="_blank" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px">View →</a>` : ''}</div>`).join('')}</div></section>` : ''}

<section id="contact" style="padding:48px 0 64px"><h2 style="font-size:28px;font-weight:700;color:#f1f5f9;margin-bottom:32px;text-align:center">Contact</h2>
<div style="max-width:500px;margin:0 auto;display:flex;flex-direction:column;gap:16px">
${email ? `<div style="color:#38bdf8">📧 <a href="mailto:${esc(email)}" style="color:#38bdf8;text-decoration:none">${esc(email)}</a></div>` : ''}
${phone ? `<div style="color:#94a3b8">📱 ${esc(phone)}</div>` : ''}
</div></section>
</main>
<footer style="border-top:1px solid rgba(56,189,248,0.1);padding:24px 0;text-align:center"><p style="color:#475569;font-size:14px">© ${year} ${esc(name)}</p></footer>
${navScript}</body></html>`;
    }

    // ========== MINIMAL ==========
    function generateMinimal() {
        return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)} — Portfolio</title>${responsiveCSS}
<style>body{font-family:Georgia,'Times New Roman',serif;background:#fafafa;color:#2d2d2d;min-height:100vh;}</style></head><body>
<header style="position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #eee">
<div style="max-width:800px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:56px">
<span style="font-weight:700;font-size:16px;letter-spacing:2px;text-transform:uppercase;color:#111">${esc(name.split(' ')[0])}</span>
<nav class="desktop-nav" style="display:flex">${navIds.map(([id, l]) => `<button onclick="scrollTo('${id}')" style="padding:8px 14px;font-size:13px;cursor:pointer;background:none;border:none;color:#888;letter-spacing:1px;text-transform:uppercase;font-family:inherit">${l}</button>`).join('')}</nav>
<button class="mobile-menu-btn" style="background:none;border:none;color:#666;cursor:pointer;padding:8px;font-size:18px">☰</button>
</div>
<div class="mobile-menu" style="background:#fff;padding:8px 24px 16px;border-top:1px solid #eee">${navIds.map(([id, l]) => `<button onclick="scrollTo('${id}')" style="display:block;width:100%;text-align:left;padding:10px 0;font-size:14px;border:none;cursor:pointer;color:#888;background:transparent;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid #f5f5f5;font-family:inherit">${l}</button>`).join('')}</div>
</header>
<main style="max-width:800px;margin:0 auto;padding:0 24px">
<section id="home" style="padding:80px 0 60px;text-align:center">
${photoCircle(120, (photo ? 'filter:grayscale(20%);' : 'background:#f0f0f0;color:#999;letter-spacing:2px;') + 'margin:0 auto 32px;display:' + (photo ? 'block' : 'flex'))}
<h1 style="font-size:36px;font-weight:400;margin-bottom:8px;letter-spacing:3px;text-transform:uppercase">${esc(name)}</h1>
${title ? `<p style="font-size:16px;color:#888;margin-bottom:24px;letter-spacing:2px">${esc(title)}</p>` : ''}
${summary ? `<p style="font-size:15px;color:#666;max-width:550px;margin:0 auto 32px;line-height:1.9;font-style:italic">${esc(summary)}</p>` : ''}
<div style="width:40px;height:1px;background:#ccc;margin:0 auto"></div></section>

${skillsList.length > 0 ? `<section id="skills" style="padding:48px 0;border-top:1px solid #eee">
<h2 style="font-size:14px;color:#888;margin-bottom:24px;text-align:center;letter-spacing:3px;text-transform:uppercase">Expertise</h2>
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px">${skillsList.map(s => `<span style="padding:6px 16px;border:1px solid #ddd;border-radius:2px;font-size:13px;color:#555">${esc(s)}</span>`).join('')}</div></section>` : ''}

${experience.length > 0 ? `<section style="padding:48px 0;border-top:1px solid #eee" ${experience.length > 0 && education.length === 0 && skillsList.length === 0 ? 'id="experience"' : ''}>
<h2 style="font-size:14px;color:#888;margin-bottom:32px;text-align:center;letter-spacing:3px;text-transform:uppercase">Experience</h2>
${experience.map((exp, i) => `<div style="margin-bottom:32px;padding-bottom:32px;${i < experience.length - 1 ? 'border-bottom:1px solid #f0f0f0' : ''}">
<div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:4px"><h3 style="font-size:18px;font-weight:600;color:#2d2d2d">${esc(exp.title)}</h3><span style="font-size:13px;color:#aaa">${esc(exp.startDate)} — ${esc(exp.endDate)}</span></div>
<p style="font-size:14px;color:#888;margin-bottom:8px">${esc(exp.company)}</p>
${exp.description ? `<p style="color:#666;line-height:1.8;white-space:pre-line;font-size:14px">${esc(exp.description)}</p>` : ''}</div>`).join('')}</section>` : ''}

${education.length > 0 ? `<div id="experience" style="padding:48px 0;border-top:1px solid #eee">
<h2 style="font-size:14px;color:#888;margin-bottom:32px;text-align:center;letter-spacing:3px;text-transform:uppercase">Education</h2>
${education.map(edu => `<div style="margin-bottom:24px;display:flex;flex-wrap:wrap;justify-content:space-between">
<div><h3 style="font-size:16px;font-weight:600;color:#2d2d2d">${esc(edu.degree)}</h3><p style="font-size:14px;color:#888">${esc(edu.school)}</p></div>
<span style="font-size:13px;color:#aaa">${esc(edu.startDate)} — ${esc(edu.endDate)}</span></div>`).join('')}</div>` : ''}

${projects.length > 0 ? `<section id="projects" style="padding:48px 0;border-top:1px solid #eee">
<h2 style="font-size:14px;color:#888;margin-bottom:32px;text-align:center;letter-spacing:3px;text-transform:uppercase">Selected Work</h2>
${projects.map((p, i) => `<div style="margin-bottom:32px;padding-bottom:32px;${i < projects.length - 1 ? 'border-bottom:1px solid #f0f0f0' : ''}">
<h3 style="font-size:20px;font-weight:600;color:#2d2d2d;margin-bottom:8px">${esc(p.name)}</h3>
${p.description ? `<p style="color:#666;line-height:1.8;margin-bottom:12px;font-size:14px">${esc(p.description)}</p>` : ''}
${p.technologies ? `<p style="color:#aaa;font-size:13px">${esc(p.technologies)}</p>` : ''}
${p.link ? `<a href="${esc(absUrl(p.link))}" target="_blank" style="color:#2d2d2d;font-size:13px;font-weight:600;text-decoration:underline;margin-top:8px;display:inline-block">View Project</a>` : ''}</div>`).join('')}</section>` : ''}

<section id="contact" style="padding:48px 0 64px;border-top:1px solid #eee;text-align:center">
<h2 style="font-size:14px;color:#888;margin-bottom:24px;letter-spacing:3px;text-transform:uppercase">Contact</h2>
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:24px">
${email ? `<a href="mailto:${esc(email)}" style="color:#2d2d2d;text-decoration:none;font-size:14px;border-bottom:1px solid #ccc;padding-bottom:2px">${esc(email)}</a>` : ''}
${phone ? `<span style="color:#666;font-size:14px">${esc(phone)}</span>` : ''}
${linkedin ? `<a href="${esc(absUrl(linkedin))}" target="_blank" style="color:#2d2d2d;text-decoration:none;font-size:14px;border-bottom:1px solid #ccc;padding-bottom:2px">LinkedIn</a>` : ''}
</div></section>
</main>
<footer style="border-top:1px solid #eee;padding:24px 0;text-align:center"><p style="color:#ccc;font-size:12px;letter-spacing:1px">© ${year} ${esc(name)}</p></footer>
${navScript}</body></html>`;
    }

    // ========== GRADIENT ==========
    function generateGradient() {
        return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)} — Portfolio</title>${responsiveCSS}
<style>body{font-family:'Segoe UI',system-ui,sans-serif;background:#fdf2f8;color:#1e1b4b;min-height:100vh;}</style></head><body>
<header style="position:sticky;top:0;z-index:50;background:linear-gradient(135deg,#7c3aed,#db2777);box-shadow:0 4px 20px rgba(124,58,237,0.3)">
<div style="max-width:1100px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:64px">
<span style="font-weight:800;font-size:20px;color:#fff">✦ ${esc(name.split(' ')[0])}</span>
<nav class="desktop-nav" style="display:flex;gap:2px">${navIds.map(([id, l]) => `<button onclick="scrollTo('${id}')" style="padding:8px 16px;border-radius:20px;font-size:14px;font-weight:600;cursor:pointer;background:none;border:none;color:#fff;font-family:inherit">${l}</button>`).join('')}</nav>
<button class="mobile-menu-btn" style="background:none;border:none;color:#fff;cursor:pointer;padding:8px;font-size:20px">☰</button>
</div>
<div class="mobile-menu" style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:8px 24px 16px">${navIds.map(([id, l]) => `<button onclick="scrollTo('${id}')" style="display:block;width:100%;text-align:left;padding:10px 12px;border-radius:10px;font-size:16px;font-weight:600;border:none;cursor:pointer;color:#fff;background:transparent;font-family:inherit">${l}</button>`).join('')}</div>
</header>
<main style="max-width:1100px;margin:0 auto;padding:0 24px">
<section id="home" style="padding:80px 0 60px;text-align:center">
${photo ? `<div style="width:150px;height:150px;border-radius:24px;overflow:hidden;margin:0 auto 28px;box-shadow:0 12px 40px rgba(124,58,237,0.25)"><img src="${esc(photo)}" alt="${esc(name)}" style="width:100%;height:100%;object-fit:cover"></div>` : `<div style="width:150px;height:150px;border-radius:24px;background:linear-gradient(135deg,#7c3aed,#db2777);display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:700;color:#fff;margin:0 auto 28px;box-shadow:0 12px 40px rgba(124,58,237,0.25)">${esc(initials)}</div>`}
<h1 style="font-size:44px;font-weight:800;margin-bottom:8px;color:#7c3aed">${esc(name)}</h1>
${title ? `<p style="font-size:20px;color:#7c3aed;font-weight:600;margin-bottom:16px">${esc(title)}</p>` : ''}
${summary ? `<p style="font-size:16px;color:#64748b;max-width:600px;margin:0 auto 32px;line-height:1.8">${esc(summary)}</p>` : ''}
<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:12px">
${email ? `<a href="mailto:${esc(email)}" style="padding:10px 24px;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;box-shadow:0 4px 15px rgba(124,58,237,0.3)">Email Me</a>` : ''}
${linkedin ? `<a href="${esc(absUrl(linkedin))}" target="_blank" style="padding:10px 24px;background:#fff;color:#7c3aed;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;border:2px solid #7c3aed">LinkedIn</a>` : ''}
</div></section>

${skillsList.length > 0 ? `<section id="skills" style="padding:48px 0"><h2 style="font-size:28px;font-weight:800;margin-bottom:32px;text-align:center;color:#7c3aed">Skills</h2>
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px">${skillsList.map(s => `<span style="padding:8px 20px;background:#fff;border-radius:20px;font-size:14px;font-weight:600;color:#7c3aed;box-shadow:0 2px 10px rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.1)">${esc(s)}</span>`).join('')}</div></section>` : ''}

${experience.length > 0 ? `<section id="experience" style="padding:48px 0"><h2 style="font-size:28px;font-weight:800;margin-bottom:32px;text-align:center;color:#7c3aed">Experience</h2>
${experience.map(exp => `<div style="background:#fff;border-radius:20px;padding:28px;box-shadow:0 4px 20px rgba(124,58,237,0.08);border-left:4px solid #7c3aed;margin-bottom:20px">
<div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:8px"><h3 style="font-size:18px;font-weight:700;color:#1e1b4b">${esc(exp.title)}</h3><span style="font-size:13px;font-weight:600;color:#db2777">${esc(exp.startDate)} — ${esc(exp.endDate)}</span></div>
<p style="color:#7c3aed;font-weight:600;margin-bottom:8px;font-size:14px">${esc(exp.company)}</p>
${exp.description ? `<p style="color:#64748b;line-height:1.7;white-space:pre-line;font-size:14px">${esc(exp.description)}</p>` : ''}</div>`).join('')}</section>` : ''}

${education.length > 0 ? `<div style="padding:0 0 48px"><h2 style="font-size:28px;font-weight:800;margin-bottom:32px;text-align:center;color:#7c3aed">Education</h2>
${education.map(edu => `<div style="background:#fff;border-radius:20px;padding:24px;box-shadow:0 4px 20px rgba(219,39,119,0.06);margin-bottom:16px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center">
<div><h3 style="font-size:18px;font-weight:700;color:#1e1b4b">${esc(edu.degree)}</h3><p style="color:#7c3aed;font-weight:600;font-size:14px">${esc(edu.school)}</p></div>
<span style="font-size:13px;font-weight:600;color:#db2777">${esc(edu.startDate)} — ${esc(edu.endDate)}</span></div>`).join('')}</div>` : ''}

${projects.length > 0 ? `<section id="projects" style="padding:48px 0"><h2 style="font-size:28px;font-weight:800;margin-bottom:32px;text-align:center;color:#7c3aed">Projects</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px">${projects.map(p => `<div style="background:#fff;border-radius:20px;padding:28px;box-shadow:0 4px 20px rgba(124,58,237,0.06)">
<h3 style="font-size:20px;font-weight:700;color:#1e1b4b;margin-bottom:8px">${esc(p.name)}</h3>
${p.description ? `<p style="color:#64748b;line-height:1.7;margin-bottom:16px;font-size:14px">${esc(p.description)}</p>` : ''}
${p.technologies ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">${p.technologies.split(',').map(t => `<span style="background:rgba(124,58,237,0.08);color:#7c3aed;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600">${esc(t.trim())}</span>`).join('')}</div>` : ''}
${p.link ? `<a href="${esc(absUrl(p.link))}" target="_blank" style="color:#db2777;text-decoration:none;font-weight:600;font-size:14px">View Project →</a>` : ''}</div>`).join('')}</div></section>` : ''}

<section id="contact" style="padding:48px 0 64px"><h2 style="font-size:28px;font-weight:800;margin-bottom:32px;text-align:center;color:#7c3aed">Let's Connect</h2>
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px">
${email ? `<a href="mailto:${esc(email)}" style="padding:10px 24px;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;border-radius:24px;text-decoration:none;font-weight:600">${esc(email)}</a>` : ''}
${phone ? `<span style="padding:10px 24px;color:#7c3aed">${esc(phone)}</span>` : ''}
</div></section>
</main>
<footer style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:24px 0;text-align:center"><p style="color:rgba(255,255,255,0.8);font-size:14px">© ${year} ${esc(name)}</p></footer>
${navScript}</body></html>`;
    }

    // ========== DEVELOPER ==========
    function generateDev() {
        const devNavIds = navIds.map(([id, l]) => [id, `~/${l.toLowerCase()}`]);
        return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)} — Portfolio</title>${responsiveCSS}
<style>body{font-family:'Cascadia Code','Fira Code','Courier New',monospace;background:#0a0a0a;color:#e0e0e0;min-height:100vh;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}</style></head><body>
<header style="position:sticky;top:0;z-index:50;background:#111;border-bottom:1px solid #1a1a1a">
<div style="max-width:1000px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:52px">
<span style="font-weight:600;font-size:14px;color:#4ade80">&gt; ${esc(name.split(' ')[0].toLowerCase())}<span style="animation:blink 1s infinite;color:#4ade80">_</span></span>
<nav class="desktop-nav" style="display:flex">${devNavIds.map(([id, l]) => `<button onclick="scrollTo('${id}')" style="padding:6px 12px;font-size:13px;cursor:pointer;background:none;border:none;color:#666;font-family:inherit">${l}</button>`).join('')}</nav>
<button class="mobile-menu-btn" style="background:none;border:none;color:#4ade80;cursor:pointer;padding:8px;font-size:18px">☰</button>
</div>
<div class="mobile-menu" style="background:#111;padding:4px 20px 12px">${devNavIds.map(([id, l]) => `<button onclick="scrollTo('${id}')" style="display:block;width:100%;text-align:left;padding:8px 0;font-size:14px;border:none;cursor:pointer;color:#666;background:transparent;font-family:inherit">${l}</button>`).join('')}</div>
</header>
<main style="max-width:1000px;margin:0 auto;padding:0 20px">
<section id="home" style="padding:80px 0 60px">
<div style="display:flex;flex-wrap:wrap;align-items:center;gap:32px">
${photoSquare(120, 'border:2px solid #4ade80;flex-shrink:0;' + (photo ? '' : 'background:#111;color:#4ade80'))}
<div style="flex:1;min-width:280px">
<p style="color:#666;font-size:14px;margin-bottom:4px">// Hello world, I am</p>
<h1 style="font-size:32px;font-weight:700;color:#fff;margin-bottom:4px">${esc(name)}</h1>
<p style="color:#4ade80;margin-bottom:16px"><span style="color:#c084fc">const</span> role = <span style="color:#fbbf24">"${esc(title || 'Developer')}"</span>;</p>
${summary ? `<p style="color:#888;line-height:1.7;max-width:550px;margin-bottom:16px">${esc(summary)}</p>` : ''}
<div style="display:flex;flex-wrap:wrap;gap:8px">
${email ? `<a href="mailto:${esc(email)}" style="padding:6px 14px;background:#1a1a1a;border:1px solid #333;border-radius:4px;color:#4ade80;text-decoration:none;font-size:13px">📧 ${esc(email)}</a>` : ''}
${linkedin ? `<a href="${esc(absUrl(linkedin))}" target="_blank" style="padding:6px 14px;background:#1a1a1a;border:1px solid #333;border-radius:4px;color:#60a5fa;text-decoration:none;font-size:13px">LinkedIn</a>` : ''}
</div></div></div></section>

${skillsList.length > 0 ? `<section id="skills" style="padding:48px 0">
<p style="font-size:14px;color:#666;margin-bottom:16px"><span style="color:#c084fc">const</span> <span style="color:#fff">skills</span> = [</p>
<div style="padding-left:24px;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px">${skillsList.map(s => `<span style="padding:4px 12px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:4px;font-size:13px;color:#fbbf24">"${esc(s)}"</span>`).join('')}</div>
<p style="font-size:14px;color:#666">];</p></section>` : ''}

${experience.length > 0 ? `<section id="experience" style="padding:48px 0">
<p style="font-size:14px;color:#666;margin-bottom:24px"><span style="color:#4ade80">&gt;</span> <span style="color:#fff">experience</span> --list</p>
${experience.map(exp => `<div style="background:#111;border-radius:8px;padding:20px;border-left:3px solid #4ade80;margin-bottom:12px">
<div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:4px"><span style="font-weight:700;color:#fff">${esc(exp.title)}</span><span style="font-size:12px;color:#4ade80">${esc(exp.startDate)} → ${esc(exp.endDate)}</span></div>
<p style="color:#c084fc;font-size:13px;margin-bottom:8px">${esc(exp.company)}</p>
${exp.description ? `<p style="color:#888;line-height:1.7;white-space:pre-line;font-size:13px">${esc(exp.description)}</p>` : ''}</div>`).join('')}</section>` : ''}

${education.length > 0 ? `<div style="padding:0 0 48px">
<p style="font-size:14px;color:#666;margin-bottom:24px"><span style="color:#4ade80">&gt;</span> <span style="color:#fff">education</span> --list</p>
${education.map(edu => `<div style="background:#111;border-radius:8px;padding:20px;border-left:3px solid #c084fc;margin-bottom:12px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center">
<div><span style="font-weight:700;color:#fff">${esc(edu.degree)}</span><p style="color:#888;font-size:13px">${esc(edu.school)}</p></div>
<span style="font-size:12px;color:#c084fc">${esc(edu.startDate)} → ${esc(edu.endDate)}</span></div>`).join('')}</div>` : ''}

${projects.length > 0 ? `<section id="projects" style="padding:48px 0">
<p style="font-size:14px;color:#666;margin-bottom:24px"><span style="color:#4ade80">&gt;</span> <span style="color:#fff">ls</span> ~/projects</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px">${projects.map(p => `<div style="background:#111;border-radius:8px;overflow:hidden">
<div style="padding:8px 12px;background:#1a1a1a;display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block"></span><span style="width:10px;height:10px;border-radius:50%;background:#fbbf24;display:inline-block"></span><span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span><span style="margin-left:8px;font-size:12px;color:#666">${esc(p.name?.toLowerCase().replace(/\\s+/g, '-'))}</span></div>
<div style="padding:20px"><h3 style="font-size:18px;font-weight:700;color:#4ade80;margin-bottom:8px">${esc(p.name)}</h3>
${p.description ? `<p style="color:#888;line-height:1.6;margin-bottom:12px;font-size:13px">${esc(p.description)}</p>` : ''}
${p.technologies ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">${p.technologies.split(',').map(t => `<span style="background:#1a1a1a;color:#fbbf24;padding:2px 8px;border-radius:4px;font-size:11px">${esc(t.trim())}</span>`).join('')}</div>` : ''}
${p.link ? `<a href="${esc(absUrl(p.link))}" target="_blank" style="color:#4ade80;text-decoration:none;font-size:13px">$ open ${esc(p.link)}</a>` : ''}</div></div>`).join('')}</div></section>` : ''}

<section id="contact" style="padding:48px 0 64px">
<p style="font-size:14px;color:#666;margin-bottom:24px"><span style="color:#4ade80">&gt;</span> <span style="color:#fff">contact</span> --info</p>
<div style="display:flex;flex-wrap:wrap;gap:16px">
${email ? `<span style="color:#4ade80;font-size:13px">📧 ${esc(email)}</span>` : ''}
${phone ? `<span style="color:#fbbf24;font-size:13px">📱 ${esc(phone)}</span>` : ''}
</div></section>
</main>
<footer style="border-top:1px solid #1a1a1a;padding:20px 0;text-align:center"><p style="color:#333;font-size:12px">// © ${year} ${esc(name)}</p></footer>
${navScript}</body></html>`;
    }
}
