angular.module("layout").factory('layoutFactory', function ($http, $q) {

    var fakeFundraisers = [{ "first_name": "Dane", "last_name": "Jezzard", "amount raised": "694.56" }, { "first_name": "Jake", "last_name": "Bachman", "amount raised": "921.00" },
        { "first_name": "Audy", "last_name": "Berntsson", "amount raised": "721.07" }, { "first_name": "Alf", "last_name": "Fitzroy", "amount raised": "534.15" },
        { "first_name": "Friederike", "last_name": "Wyrill", "amount raised": "902.30" }];
    var fakeTeams = [{ "team_name": "Team Pagac, Rempel and Quigley", "amount raised": "3296.11" }, { "team_name": "Von-Kutch", "amount raised": "1673.98" }, { "team_name": "Team Halvorson-Cassin", "amount raised": "2748.48" },
        { "team_name": "Team Leffler LLC", "amount raised": "1680.12" }, { "team_name": "Team Champlin Group", "amount raised": "3265.80" }];
    var service = {};
    var layout = {
        type: 'container-fluid',
        background: 'transparent',
        content: [
            {
                type: 'header', backgroundColor: 'rgb(26,91,164)',
                linkColor: '#ffffff',
                id: 10,
                logo: 'https://daks2k3a4ib2z.cloudfront.net/5909fc7f818ecc0900827a34/5942984ffe536204a1cc6557_logo_compressed.png',
                buttons: {
                    signIn: {
                        text: {
                            english: "Sign In",
                            french: "French Signin"
                        },
                        enabled: true
                    },
                    share: {
                        text: {
                            english: "Share",
                            french: "French Share"
                        },
                        enabled: true

                    },
                    search: {
                        text: {
                            english: "Search",
                            french: "Search"
                        },
                        enabled: true

                    },
                    donate: {
                        text: {
                            english: "Donate",
                            french: "Le Donate"
                        },
                        enabled: false

                    }
                }
            },
        {
            type: 'hero',
            backgroundImage: 'https://gallery.mailchimp.com/381dca877e43c44046caa6dd1/images/4ec6fcae-1f88-4090-9165-a052103f6cdb.jpg',
            progressBar:
                {
                    enabled: true,
                    includeUnverified: 'true'
                },
            buttons: {
                donate: {
                    text: {
                        english: "Give Now",
                        french: "Donner maintenant"
                    },
                    enabled: true
                },
                register: {
                    text: {
                        english: "Find Your Walk",
                        french: "Trouvez votre promenade"
                    },
                    enabled: true

                }
            }

        },
{
    type: 'container',
    backgroundColor: 'rgba(255,255,255,.7)',
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
        //{

        //    content: [
        //        //{
        //        //    type: 'content',
        //        //    size: "sm"

        //        //}, {
        //        //    type: 'content',
        //        //    size: 'sm',

        //        //    id: 4
        //        //}//, {
        //        //    type: 'container',
        //        //    size: 'sm',
        //        //    content: [
        //        //        {
        //        //            type: 'content',
        //        //            size: "md",
        //        //            id: 8
        //        //        }, {
        //        //            type: 'content',
        //        //            size: 'sm',

        //        //            id: 9
        //        //        }, {
        //        //            type: 'content',
        //        //            size: 'full',

        //        //            id: 10
        //        //        }
        //        //    ]
        //        //}
        //    ]
        //},
        {

            type: 'content',
            size: 'sm',


            id: 6
        }, {
            type: 'video',
            size: 'lg',


            id: 7
        }
    ]
},



{
    type: 'container',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
            size: 'full',
            id: 3333
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
    var WIDGETTYPES = {
        'container-fluid': { displayName: 'Full Width Row Container', userSelectable: true, sizable: false },
        container: { displayName: 'Row Container', userSelectable: true, sizable: false },
        content: { displayName: 'Content Block', userSelectable: true, sizable: true },
        hero: { displayName: 'Hero', userSelectable: false, sizable: false, required: true },
        customContent: { displayName: 'Custom Content', userSelectable: true, sizable: false },
        leaderboard: { displayName: 'Leaderboard', userSelectable: true, sizable: true },
        mediaGallery: { displayName: 'Media Gallery', userSelectable: true, sizable: true },
        donations: { displayName: 'Recent Donations', userSelectable: true, sizable: true },
        facebook: { displayName: 'Facebook Page', userSelectable: true, sizable: true },
        header: { displayName: 'Header', userSelectable: false, sizable: false, required: true },
        footer: { displayName: 'Footer', userSelectable: false, sizable: false, required: true },
        video: { displayName: 'Video', userSelectable: true, sizable: true },
        sponsors: { displayName: 'Sponsors', userSelectable: true, sizable: true }


    }
    var SIZES = {
        auto: { displayName: 'Auto', classes: '' },
        sm: { displayName: 'Small', classes: ' col-xs-12 col-sm-3' },
        lg: { displayName: 'Large', classes: ' col-xs-12 col-sm-9' },
        half: { displayName: 'Half', classes: ' col-xs-12 col-sm-6' },
        full: { displayName: 'Full', classes: ' col-xs-12' }


    };


    service.getLayout = function () {
        return layout;
    }


    service.saveLayout = function (newTheme) {

        return true;
    }
    service.isChildFriendly = function (node) {
        // move this to WIDGETTYPES
        return (node && node.type && (node.type == 'container' || node.type == 'container-fluid'));
    }
    service.availableWidgets = function () {
        return WIDGETTYPES;
    }
    service.availableSizes = function () {
        return SIZES;
    }
    //service.getLayout = function () {
    //    return $http({
    //        method: 'GET',
    //        url: 'http://mockbin.org/bin/8d423d95-53a2-4fe9-ad29-7b910e48b24b'
    //    }).then(function (response) {
    //        return response.data;
    //    }).catch(function (response) {
    //        return $q.reject(response.data);
    //    });
    //};




    return service;
})