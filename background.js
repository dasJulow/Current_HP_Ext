chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    console.log("Extension is running!");
    chrome.storage.sync.get(null, function(result) {
        console.log("Storage sync is working!!!")
      const links = Object.values(result).flat();
      const matchingLinks = links.filter(link => {
        if (details.url.startsWith(link)) {
            console.log(`The match is: ${link}`);
            return true;
        } else {
            console.log('Sorry, not match found')
            return false;
        }
    });
    
      if (matchingLinks.length > 0) {
        const randomMatchingLink = matchingLinks[Math.floor(Math.random() * matchingLinks.length)];
        const allMatchingLinks = links.filter(link => link === randomMatchingLink);
        const randomLink = allMatchingLinks[Math.floor(Math.random() * allMatchingLinks.length)];
        chrome.tabs.update(details.tabId, { url: randomLink });
      }
    });
  });
  
