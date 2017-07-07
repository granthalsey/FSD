angular.module("layout").factory('layoutFactory', function () {
    var service = {};
    var layout = {
        type: 'container-fluid',
        background: 'transparent',
        content: [
            {
                type: 'container-fluid',
                backgroundColor: 'red',
                content: [{ type: 'header' }],
                id: 1
            },
            {
                type: 'container',
                backgroundColor: 'transparent',
                content: [{
                    type: 'hero',
                    id: 2
                }]
            },
            {
                type: 'container',
                content: [
                    {
                        type: 'container',
                        content: [
                            {
                                type: 'content',
                                size: "sm",
                                id: 3
                            }, {
                                type: 'content',
                                size: 'sm',

                                id: 4
                            }, {
                                type: 'container',
                                size: 'sm',
                                content: [
                                    {
                                        type: 'content',
                                        size: "md",
                                        id: 8
                                    }, {
                                        type: 'content',
                                        size: 'sm',

                                        id: 9
                                    }, {
                                        type: 'content',
                                        size: 'full',

                                        id: 10
                                    }
                                ]
                            }
                        ]
                    }, {
                        type: 'content',
                        size: 'sm',


                        id: 6
                    }, {
                        type: 'content',
                        size: 'full',


                        id: 7
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