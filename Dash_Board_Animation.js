
// Ngăn phóng to/thu nhỏ bằng Ctrl + +/- hoặc Ctrl + cuộn chuột
window.addEventListener('wheel', e => {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

window.addEventListener('keydown', e => {
  // Chặn Ctrl + (+/-/=), Ctrl + U, Ctrl + S, F12
  if (
    (e.ctrlKey && ['+', '-', '=', '0', 'u', 's'].includes(e.key.toLowerCase())) ||
    e.key === 'F12'
  ) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

// Luôn ép zoom về 100% khi mới vào và khi có thay đổi
function enforceZoom100() {
  document.body.style.zoom = '100%';
  document.body.style.transform = 'scale(1)';
  document.body.style.transformOrigin = 'top left';
}

document.addEventListener('DOMContentLoaded', () => {
  enforceZoom100();

  // Lặp lại liên tục để ép về 100% nếu bị thay đổi
  setInterval(() => {
    enforceZoom100();
  }, 500);
});

// Tạo overlay cảnh báo nếu DevTools bị mở
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.background = 'rgba(0, 0, 0, 0.8)';
overlay.style.backdropFilter = 'blur(8px)';
overlay.style.display = 'none';
overlay.style.zIndex = '99999';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.color = 'white';
overlay.style.fontFamily = '"Baloo", sans-serif';
overlay.style.fontWeight = 'bold';
overlay.style.fontSize = '2em';
overlay.innerText = 'Bạn đang mở Dev Tool!';
document.body.appendChild(overlay);

// Phát hiện DevTools mở và bật overlay
setInterval(() => {
  const isDevToolsOpen = (
    window.outerWidth - window.innerWidth > 160 ||
    window.outerHeight - window.innerHeight > 160
  );
  overlay.style.display = isDevToolsOpen ? 'flex' : 'none';
}, 500);


//link Go To Year:  
document.getElementById("goToYearLink").addEventListener("click", function (e) {
  e.preventDefault(); // Chặn hành vi mặc định của thẻ <a>

  const url = "https://docs.google.com/spreadsheets/d/1uIU21ZVrdAzC6SwvsYDrbRh5gL4aB2tsMIeUyJ5RvCs/edit?gid=991805121#gid=991805121";

  // Mở với tên cố định: nếu tab đó đã mở, sẽ chuyển đến tab đó
  window.open(url, "SalaryYearTab");
});

// ───── Hiệu ứng nổi và rơi của phần tiêu đề calendar ─────
function initCalendarTop() {
  const wrapper = document.querySelector('.calendar-wrapper');
  const top = document.querySelector('.calendar-top');
  let timeout;

  if (!wrapper || !top) return;

  wrapper.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
    top.classList.remove('falling');
    void top.offsetWidth; // 🚨 Trigger reflow để restart animation
    top.classList.add('rising');
    timeout = setTimeout(() => top.classList.add('z-top'), 300);
  });

  wrapper.addEventListener('mouseleave', () => {
    clearTimeout(timeout);
    top.classList.remove('rising', 'z-top');
    void top.offsetWidth; // 🚨 Trigger reflow để restart animation
    top.classList.add('falling');
  });
}


//  -----------------  Echo Effect  ----------------------------------------------------------

// Echo Effect + Hover khi đưa chuột vào Card Chính
document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  const title = document.querySelector('.dashboard-header h1');

  let isHovering = false;

  card.addEventListener('mouseenter', () => {
    isHovering = true;

    title.style.transition = 'transform 0.6s ease-in-out, text-shadow 0.6s ease-in-out, filter 0.6s ease-in-out';
    title.style.transform = 'translateY(-40px)';
    title.style.filter = `
      drop-shadow(0 0 1px rgb(99, 245, 255))
      drop-shadow(0 0 5px rgb(99, 245, 255))
    `;
    title.style.textShadow = `
      0px 5px 1px rgba(225, 225, 225, 0.3),
      0px 10px 1.5px rgba(225, 225, 225, 0.24),
      0px 15px 2px rgba(225, 225, 225, 0.21),
      0px 20px 2.5px rgba(225, 225, 225, 0.18),
      0px 25px 3px rgba(225, 225, 225, 0.15),
      0px 30px 3.5px rgba(225, 225, 225, 0.09)
    `;

    setTimeout(() => {
      title.style.textShadow = 'none';
    }, 450);
  });

  card.addEventListener('mouseleave', () => {
    isHovering = false;

    title.style.transition = 'transform 0.6s ease-in-out, text-shadow 0.7s ease-in-out, filter 0.7s ease-in-out';
    title.style.transform = 'translateY(0)';
    title.style.textShadow = `
      0px -5px 1px rgba(225, 225, 225, 0.3),
      0px -10px 1.5px rgba(225, 225, 225, 0.24),
      0px -15px 2px rgba(225, 225, 225, 0.21),
      0px -20px 2.5px rgba(225, 225, 225, 0.18),
      0px -25px 3px rgba(225, 225, 225, 0.15),
      0px -30px 3.5px rgba(225, 225, 225, 0.09)
    `;

    setTimeout(() => {
      title.style.textShadow = 'none';
      title.style.filter = 'none';
    }, 500);
  });

  title.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform' && isHovering) {
      title.style.filter = `
        drop-shadow(0 0 1px rgb(99, 245, 255))
        drop-shadow(0 0 5px rgb(99, 245, 255))
      `;
      title.style.textShadow = `
        -1px -1px 0 rgba(99, 245, 255, 0.5),
         1px -1px 0 rgba(99, 245, 255, 0.5),
        -1px  1px 0 rgba(99, 245, 255, 0.5),
         1px  1px 0 rgba(99, 245, 255, 0.5)
      `;
    }
  });
});



// Echo Effect + Hover khi đưa chuột vào Calendar

document.addEventListener('DOMContentLoaded', () => {
  const calendarTop = document.querySelector('.calendar');
  const title = document.querySelector('.dashboard-header h1');

  let isHovering = false;

  calendarTop.addEventListener('mouseenter', () => {
    isHovering = true;

    title.style.transition = 'transform 0.6s ease-in-out, text-shadow 0.6s ease-in-out, filter 0.6s ease-in-out';
    title.style.transform = 'translateX(-275px) translateY(-40px)';
    title.style.filter = `
      drop-shadow(0px 0 1px rgb(99, 245, 255)) 
      drop-shadow(0px 0 5px rgb(99, 245, 255))
    `;
    title.style.textShadow = `
      5px 5px 1px rgba(225, 225, 225, 0.3),
      10px 10px 1.5px rgba(225, 225, 225, 0.24),
      15px 15px 2px rgba(225, 225, 225, 0.21),
      20px 20px 2.5px rgba(225, 225, 225, 0.18),
      25px 25px 3px rgba(225, 225, 225, 0.15),
      30px 30px 3.5px rgba(225, 225, 225, 0.09)
    `;

    setTimeout(() => {
      title.style.textShadow = 'none';
    }, 450);
  });

  calendarTop.addEventListener('mouseleave', () => {
    isHovering = false;

    title.style.transition = 'transform 0.6s ease-in-out, text-shadow 0.7s ease-in-out, filter 0.7s ease-in-out';
    title.style.transform = 'translateX(0)';
    title.style.textShadow = `
      -4px -4px 1px rgba(225, 225, 225, 0.3),
      -8px -8px 1.5px rgba(225, 225, 225, 0.24),
      -12px -12px 2px rgba(225, 225, 225, 0.21),
      -16px -16px 2.5px rgba(225, 225, 225, 0.18),
      -20px -20px 3px rgba(225, 225, 225, 0.15),
      -24px -24px 3.5px rgba(225, 225, 225, 0.09)
    `;
    setTimeout(() => {
      title.style.textShadow = 'none';
      title.style.filter = 'none';
    }, 500);
  });

  title.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform' && isHovering) {
        title.style.filter = `
      drop-shadow(0px 0 1px rgb(99, 245, 255)) 
      drop-shadow(0px 0 5px rgb(99, 245, 255))
    `;
      title.style.textShadow = `
        -1px -1px 0 rgba(99, 245, 255, 0.5),
         1px -1px 0 rgba(99, 245, 255, 0.5),
        -1px  1px 0 rgba(99, 245, 255, 0.5),
         1px  1px 0 rgba(99, 245, 255, 0.5)
      `;
    }
  });
});

//-------------------------------------------------------------------------------------------------------------------------------------------

//Tránh xung độ animation của Card
document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  card.classList.add('animate-in');

  // Gỡ animation để hover không bị xung đột
  card.addEventListener('animationend', () => {
    card.classList.remove('animate-in');
  });
});