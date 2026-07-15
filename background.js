const TAB_INDEX_REGEX = /tab(\d+)/;
const LAST_TAB_COMMAND_NAME = 'lastTab';

browser.commands.onCommand.addListener(name => {
  if (name === LAST_TAB_COMMAND_NAME) {
    browser.tabs.query({currentWindow: true}).then(tabs => {
      if (tabs.length > 0) {
        browser.tabs.update(tabs.at(-1).id, { active: true })
      }
    });
  } else {
    const index = parseInt(TAB_INDEX_REGEX.exec(name)[1], 10);
    browser.tabs.query({currentWindow: true, index}).then(tabs => {
      if (tabs.length > 0)
        browser.tabs.update(tabs[0].id, { active: true });
    })
  }
})