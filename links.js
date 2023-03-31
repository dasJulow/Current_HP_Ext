import { storage } from 'chrome';

const currentChannelName = localStorage.getItem('channelName');
console.log(currentChannelName);
const heading = document.getElementById('aff_links');
heading.innerText += ` for ${currentChannelName}`;

const affiliateLinksUl = document.getElementById('affiliate-links');

// Get the video descriptions from the URL parameter and parse it back into an array
const urlParams = new URLSearchParams(window.location.search);
const videoDescriptions = JSON.parse(decodeURIComponent(urlParams.get('videoDescriptions')));

// Loop through the video descriptions and create li elements with links
videoDescriptions.forEach(description => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = description.description.match(urlRegex);
  if (matches) {
    matches.forEach(match => {
      const link = document.createElement('a');
      link.textContent = match;
      link.href = match;
      if (match.startsWith('http') || match.startsWith('https')) {
        const li = document.createElement('li');
        li.appendChild(link);
        affiliateLinksUl.appendChild(li);
        li.classList.add('style');
        link.addEventListener('click', function(event) {
          event.preventDefault();
          storage.sync.get(currentChannelName, function(result) {
            const links = result[currentChannelName] || [];
            if (!links.includes(event.target.href)) {
              links.push(event.target.href);
              storage.sync.set({ [currentChannelName]: links }, function() {
                console.log('Link saved to storage');
              });
            } else {
              console.log('Link already exists in storage');
            }
          });
        });
      }
    });
  }
});

export { currentChannelName };




