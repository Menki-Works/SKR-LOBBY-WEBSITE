fetch("../../data/game.json")
  .then(res => res.json())
  .then(json => {
    const skillData = json["PCSkillTable"];
    if (!skillData) return;

    Object.keys(skillData).forEach((key) => {
      const el = document.getElementById(key);
      if (!el) return;

      let text = skillData[key];

      // ✅ ซ่อมแท็กที่ใช้ </> ให้เป็น </text> (สำหรับคนขี้ลืม)
      text = text.replace(/<\/>/g, '</text>');

      // ✅ แทนที่ {0} ถึง {9}
      for (let i = 0; i <= 9; i++) {
        const attr = el.getAttribute(`data-${i}`);
        if (attr !== null) {
          const regex = new RegExp(`\\{${i}\\}`, "g");
          text = text.replace(regex, attr);
        }
      }

      // ✅ แทนที่ {Value}, {Percent}
      const val = el.getAttribute("data-Value");
      if (val !== null) text = text.replace(/\{Value\}/g, val);

      const percent = el.getAttribute("data-percent");
      if (percent !== null) text = text.replace(/\{Percent\}/g, percent);

      el.innerHTML = text;
    });
  });



