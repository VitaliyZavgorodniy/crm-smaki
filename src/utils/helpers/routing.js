export function getDynamicRouteTab(pathname, tabs) {
    const pathnameArray = pathname.split('/').filter(el => el);

    const activeTab = tabs.find(tab => tab.path === pathname);

    if (pathnameArray.length > 1) {
        const possibleTabs = tabs
            .map((el, index) => {
                const tab = {
                    index,
                    path            : el.path.split(':'),
                    numberOfEntries : 0
                };

                return tab;
            }).filter(el => el.path.length > 1);

        possibleTabs.forEach(tab => {
            tab.path.forEach(pathItem => {
                if (pathname.includes(pathItem)) {
                    tab.numberOfEntries++;
                }
            });
        });

        const activeTabIndex =
            possibleTabs.sort((a, b) => a.numberOfEntries - b.numberOfEntries)[0].index;

        return tabs[activeTabIndex];
    }


    return activeTab;
}
