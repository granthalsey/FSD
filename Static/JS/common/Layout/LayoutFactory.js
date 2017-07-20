angular.module("layout").factory('layoutFactory', function () {
    var fakeFundraisers = [{ "first_name": "Dane", "last_name": "Jezzard", "amount raised": "694.56" }, { "first_name": "Jake", "last_name": "Bachman", "amount raised": "921.00" }, { "first_name": "Audy", "last_name": "Berntsson", "amount raised": "721.07" }, { "first_name": "Alf", "last_name": "Fitzroy", "amount raised": "534.15" }, { "first_name": "Friederike", "last_name": "Wyrill", "amount raised": "902.30" }, { "first_name": "Melloney            ", "last_name": "Ainslie", "amount raised": "995.51" }, { "first_name": "Ashlie", "last_name": "Ashfold", "amount raised": "903.65" }, { "first_name": "Boone", "last_name": "Hendriksen", "amount raised": "870.75" }, { "first_name": "Nicolais            ", "last_name": "Tombleson           ", "amount raised": "776.74" }, { "first_name": "Justino", "last_name": "Drogan", "amount raised": "738.59" }];
    var fakeTeams = [{ "team_name": "Team Pagac, Rempel and Quigley", "amount raised": "3296.11" }, { "team_name": "Von-Kutch", "amount raised": "1673.98" }, { "team_name": "Team Halvorson-Cassin", "amount raised": "2748.48" }, { "team_name": "Team Leffler LLC", "amount raised": "1680.12" }, { "team_name": "Team Champlin Group", "amount raised": "3265.80" }, { "team_name": "Team Von-O'Hara", "amount raised": "4180.92" }, { "team_name": "Team Treutel, Koss and Casper", "amount raised": "4136.59" }, { "team_name": "Lubowitz, Wyman and Hand", "amount raised": "1439.66" }, { "team_name": "Barton and Sons", "amount raised": "2349.20" }, { "team_name": "Team Bartoletti-Kuhic", "amount raised": "2454.21" }];
    var service = {};
    var layout = {
        type: 'container-fluid',
        background: 'transparent',
        content: [
          { type: 'header', backgroundColor: 'rgb(26,91,164)', id: 10 },
            {
                type: 'hero',
                backgroundImage: 'https://gallery.mailchimp.com/381dca877e43c44046caa6dd1/images/4ec6fcae-1f88-4090-9165-a052103f6cdb.jpg'

            },
            {
                type: 'container',
                backgroundColor: '#fff',
                id: 11,
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
                id: 12,
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
                                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                  id: 13,
                                  content: [
                                      {
                                          type: 'leaderboard',
                                          source: 'individual',
                                          size: 'half',
                                          members: fakeFundraisers,
                                          heading: 'Top Individuals',
                                          bodyColor: '#444b55',
                                          id: 14


                                      },
                                        {
                                            type: 'leaderboard',
                                            source: 'team',
                                            size: 'half',
                                            heading: 'Top Teams',
                                            members: fakeTeams,
                                            bodyColor: '#444b55',
                                            id: 15

                                        }

                                  ]


                              }, {
                                  type: 'container',
                                  backgroundColor: '#22c2d2',
                                  id: 16,
                                  content: [
                                      {
                                          type: 'sponsors',

                                          id: 3
                                      }
                                  ]


                              },
            {
                type: 'footer',

                id: 17,
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