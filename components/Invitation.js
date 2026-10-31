"use client";
import { useEffect, useRef, useState } from "react";
import { config as c } from "../lib/config";
import { fill, joinNames } from "../lib/text";
import guests from "../guests.json";
import Flower from "./Flower";
import Fireworks from "./Fireworks";
import { Sparkle, Tulip, Sprig, Cloud } from "./Decor";

const Orn = () => <div className="orn"><Sparkle /><Sparkle className="s2" /><Sparkle /></div>;
// Mỗi người một cụm, không bị tách chữ giữa chừng: "A," "B" "& C"
function splitNames(raw) {
  const items = raw.split(/\s*,\s*|\s*&\s*/).filter(Boolean);
  return items.map((t, i) =>
    (i > 0 && i === items.length - 1 ? "& " : "") + t + (i < items.length - 2 ? "," : ""));
}
// tên càng dài thì chữ càng nhỏ
const nameSize = (n) => (n.length <= 10 ? 2 : n.length <= 18 ? 1.75 : n.length <= 28 ? 1.5 : 1.3);

export default function Invitation({ guest: first = { name: "" } }) {
  const [guest, setGuest] = useState(first);
  const [land, setLand] = useState(false); // ảnh khách là ảnh ngang?
  useEffect(() => {
    const to = new URLSearchParams(window.location.search).get("to");
    if (!to) return;
    const norm = (s) => s.normalize("NFC").trim().toLowerCase();
    const found = guests.find((g) => norm(joinNames(g.name)) === norm(to));
    const photo = found?.photo || "";
    setGuest({ name: to.slice(0, 80), photo });
    if (photo) {
      const im = new Image();
      im.onload = () => setLand(im.naturalWidth > im.naturalHeight);
      im.src = photo;
    }
  }, []);
  const [stage, setStage] = useState(0); // 0 đóng, 1 đang mở, 2 xong
  const words = c.name.split(" ");
  const vip = /^chị nhi/i.test((guest.name || "").normalize("NFC"));
  const audioRef = useRef(null);
  const [music, setMusic] = useState("idle"); // idle | on | off | none

  const open = () => {
    if (stage) return;
    setStage(1);
    setTimeout(() => setStage(2), 2900);
    if (c.music) {
      // phải bật nhạc ngay trong lúc người dùng chạm thì trình duyệt mới cho phát
      const a = new Audio((process.env.NEXT_PUBLIC_BASE_PATH || "") + c.music);
      a.loop = true; a.volume = 0.6;
      a.addEventListener("error", () => setMusic("none"));
      a.play().then(() => setMusic("on")).catch(() => {});
      audioRef.current = a;
    }
  };
  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setMusic("on"); } else { a.pause(); setMusic("off"); }
  };
  useEffect(() => () => audioRef.current?.pause(), []);

  useEffect(() => {
    if (stage < 2) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stage]);

  useEffect(() => {
    document.body.style.overflow = stage === 2 ? "auto" : "hidden";
  }, [stage]);

  return (
    <>
      <div className="bg" aria-hidden>
        <Cloud className="cl c1" /><Cloud className="cl c2" /><Cloud className="cl c3" />
        {[8, 22, 40, 61, 78, 91].map((l, i) => (
          <Sparkle key={i} className="float" style={{ left: `${l}%`, top: `${(i * 17) % 90}%`, animationDelay: `${i * 0.7}s` }} />
        ))}
      </div>

      <Fireworks active={stage >= 1} />
      {(music === "on" || music === "off") && (
        <button className={`mbtn ${music}`} onClick={toggleMusic} aria-label="Bật/tắt nhạc">♪</button>
      )}

      {stage < 2 && (
        <div className={`intro ${stage === 1 ? "opening" : ""}`} onClick={open}>
          <h1 className="intro-title"><span>INVITING</span><em>to you</em></h1>
          <div className="env">
            <div className="env-back" />
            <div className="env-letter">
              <b className="cn a">✦</b><b className="cn b">✦</b><b className="cn c">✦</b><b className="cn d">✦</b>
              <small>{guest.name ? (vip ? "Thân gửi" : "Gửi bạn") : "Thiệp mời"}</small>
              {guest.name ? (
  <span className="gn" style={{ fontSize: `${nameSize(guest.name)}rem` }}>
    {splitNames(guest.name).map((t, i) => <b key={i}>{t}</b>)}
  </span>
) : (
  <span>{c.name}</span>
)}
              <i className="ln" />
            </div>
            <div className="env-front" />
            <div className="env-flap" />
            <div className="seal" />
            <Tulip className="tulip" />
          </div>
          <p className="hint">{stage ? "" : "Chạm để mở thiệp…"}</p>
        </div>
      )}

      <main className={`invite ${stage === 2 ? "show" : ""}`}>
        <section className="sec">
          <Flower className="fl fl-a" />
          <Sparkle className="dec" style={{ top: 10, right: "4%", width: 26 }} />
          <div className="navy-card reveal">
            <p className="small">{vip ? "Trân trọng kính mời chị/bạn đến dự lễ tốt nghiệp của" : fill(c.intro, guest.name)}</p>
            {words.map((w, i) => <h2 key={i} className="script nm">{w}</h2>)}
          </div>
        </section>

        <Orn />

        <section className="sec">
          <div className="date-card reveal">
            <Sprig className="sprig" />
            <Flower className="fl fl-b" flip />
            <div className="day">{c.day}</div>
            <div className="script month">{c.month}</div>
            <div className="yr">{c.year}</div>
            <div className="dv" />
            <p className="time">{c.time}</p>
            <p className="place">{c.place}</p>
            <p className="addr">{c.address}</p>
            {c.mapLink && <a className="btn ghost" href={c.mapLink} target="_blank" rel="noreferrer">Xem bản đồ</a>}
          </div>
          {c.parking && (
            <div className="parking reveal">
              <Sprig className="pk-sprig" flip />
              <p className="pk-title"><i>P</i>{c.parking.title}</p>
              {c.parking.lines.map((l, i) => <p key={i}>{l}</p>)}
            </div>
          )}
        </section>

        <section className="sec">
          <div className="thanks reveal"><span>Thank<br />You</span></div>
          <div className="letter reveal"><p>{c.message}</p></div>
          <Tulip className="tulip-s" flip />
        </section>

        <Orn />

        <section className={`sec photos${land ? " land" : ""}`}>
  {[c.photos[0], guest.photo || c.photos[1]].map((src, i) => (
    <figure key={i} className={`polaroid p${i} reveal`}>
      {src ? <img src={src} alt="" loading="lazy" /> : <div className="ph" />}
    </figure>
  ))}
</section>

        <section className="sec end">
          {c.rsvpLink && <a className="btn" href={c.rsvpLink} target="_blank" rel="noreferrer">{c.rsvpText}</a>}
          <p className="small foot">{c.footer}</p>
        </section>
      </main>
    </>
  );
}
