angular.module("layout").factory('layoutFactory', function () {
    var service = {};
    var layout = {
        type: 'container-fluid',
        background: 'transparent',
        content: [
          { type: 'header', backgroundColor: 'rgb(26,91,164)' },
            {
                type: 'hero',
                backgroundImage: 'https://gallery.mailchimp.com/381dca877e43c44046caa6dd1/images/4ec6fcae-1f88-4090-9165-a052103f6cdb.jpg'

            },
            {
                type: 'container',
                backgroundColor: '#fff',
                content: [
                    {
                        type: 'content',
                        size: 'full',

                        id: 3
                    }
                ]


            },





            {
                type: 'container',
                backgroundColor: '#1a5ba4',
                content: [
                    {

                        content: [
                            //{
                            //    type: 'content',
                            //    size: "sm"

                            //}, {
                            //    type: 'content',
                            //    size: 'sm',

                            //    id: 4
                            //}//, {
                            //    type: 'container',
                            //    size: 'sm',
                            //    content: [
                            //        {
                            //            type: 'content',
                            //            size: "md",
                            //            id: 8
                            //        }, {
                            //            type: 'content',
                            //            size: 'sm',

                            //            id: 9
                            //        }, {
                            //            type: 'content',
                            //            size: 'full',

                            //            id: 10
                            //        }
                            //    ]
                            //}
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
                     type: 'container',
                     backgroundColor: '#22c2d2',
                     content: [
                         {
                             type: 'sponsors',

                             id: 3
                         }
                     ]


                 },
                              {
                                  type: 'container',

                                  content: [
                                      {
                                          type: 'fundraiserLeaderboard',

                                          size: 'half'
                                      },
                                        {
                                            type: 'teamLeaderboard',

                                            size: 'half'
                                        },

                                  ]


                              },
            {
                type: 'footer',
                backgroundColor: '#353535'
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
    var SIZES = ['sm', 'half', 'full'];


    service.getLayout = function () {
        return layout;
    }


    service.saveLayout = function (newTheme) {

        return true;
    }
    service.isChildFriendly = function (node) {
        return (node && node.type && (node.type == 'container' || node.type == 'container-fluid'));
    }

    return service;
})