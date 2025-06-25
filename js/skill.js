// skill.js
fetch("../../json/skill-th.json")
  .then((res) => res.json())
  .then((data) => {
    Object.keys(data).forEach((key) => {
      const el = document.getElementById(key);
      if (el && data[key] && data[key] !== "@") {
        let text = data[key];

        // แทนที่ {Value} และ {Percent} ตามเดิม
        const value = el.getAttribute("data-value");
        const percent = el.getAttribute("data-percent");
        if (value !== null) {
          text = text.replace(/\{Value\}/g, value);
        }
        if (percent !== null) {
          text = text.replace(/\{Percent\}/g, percent);
        }

        // แทนที่ {0}, {1}, {2} ด้วย data-0, data-1, data-2
        for (let i = 0; i <= 2; i++) {
          const attrValue = el.getAttribute(`data-${i}`);
          if (attrValue !== null) {
            const regex = new RegExp(`\\{${i}\\}`, "g");
            text = text.replace(regex, attrValue);
          }
        }

        el.innerHTML = text;
      }
    });
  })
  .catch((err) => {
    console.error("โหลด JSON ไม่ได้:", err);
  });
