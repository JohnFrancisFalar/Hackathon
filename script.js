const content = [
  {
    type: 'video',
    src: 'Videos/STEMIntro.mp4',
  },
  {
    type: 'image',
    src: 'Images/sdtsem213.webp'
  },
  {
    type: 'video',
    src: 'Videos/STEMIntro.mp4',
  },
];

const container = document.querySelector('.container');

content.forEach(item => {
  const card = document.createElement('div');
  card.className = 'content-card';

  // Aspect ratio box for TikTok-style media framing
  const box = document.createElement('div');
  box.className = 'aspect-ratio-box';

  let element;
  if (item.type === 'image') {
    element = document.createElement('img');
    element.src = item.src;
    element.alt = item.alt || 'Image';
  } else if (item.type === 'video') {
    element = document.createElement('video');
    element.src = item.src;
    element.muted = false; 
    element.playsInline = true;
    element.loop = true;
    element.autoplay = false; // We'll control via Intersection Observer!
    element.controls = false;
  }
  element.className = 'media-element';

  box.appendChild(element);
  card.appendChild(box);
  container.appendChild(card);
});

// TikTok-style: Auto play/pause videos as they snap into view!
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0; // Optionally start over when back
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('video.media-element').forEach(video => {
  observer.observe(video);
});