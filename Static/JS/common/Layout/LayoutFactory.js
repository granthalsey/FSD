angular.module("layout").factory('layoutFactory', function () {
    var service = {};
    var layout = {
        type: 'container-fluid',
        background: 'transparent',
        content: [
            {
                type: 'container-fluid',
                backgroundColor: 'red',
                content: [{ type: 'header' }]
            },
            {
                type: 'container',
                backgroundColor: 'transparent',
                content: [{ type: 'hero' }]
            },
            {
                type: 'container',
                content: [
                    {
                        type: 'content',
                        size: "md"
                    }, {
                        type: 'content',
                        size: 'sm'
                    }, {
                        type: 'content',
                        size: 'full'
                    }
                ]
            },
                {
                    type: 'footer'
                }
        ]

    };
    var WIDGETTYPE = {
        container: { displayName: 'Container', allowsChildren: true },
        customContent: { displayName: 'Custom Content' },
        leaderboard: { displayName: 'Leaderboard' },
        mediaGallery: { displayName: 'Media Gallery' },
        header: { displayName: 'Header' },
        footer: { displayName: 'Footer' }


    }


    service.getLayout = function () {
        return layout;
    }


    service.saveLayout = function (newTheme) {

        return true;
    }


    return service;
})