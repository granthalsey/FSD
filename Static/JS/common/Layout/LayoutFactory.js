angular.module("layout").factory('layoutFactory', function ($http, $q) {

    var fakeFundraisers = [{ "first_name": "Dane", "last_name": "Jezzard", "amount raised": "694.56" }, { "first_name": "Jake", "last_name": "Bachman", "amount raised": "921.00" },
        { "first_name": "Audy", "last_name": "Berntsson", "amount raised": "721.07" }, { "first_name": "Alf", "last_name": "Fitzroy", "amount raised": "534.15" },
        { "first_name": "Friederike", "last_name": "Wyrill", "amount raised": "902.30" }];
    var fakeTeams = [{ "team_name": "Team Pagac, Rempel and Quigley", "amount raised": "3296.11" }, { "team_name": "Von-Kutch", "amount raised": "1673.98" }, { "team_name": "Team Halvorson-Cassin", "amount raised": "2748.48" },
        { "team_name": "Team Leffler LLC", "amount raised": "1680.12" }, { "team_name": "Team Champlin Group", "amount raised": "3265.80" }];
    var fakeDonations = [{ "full_name": "Larisa Hanscomb", "amount": "$8.56" }, { "full_name": "Sheila-kathryn Risso", "amount": "$2.49" }, { "full_name": "Giulio Zielinski", "amount": "$4.73" }, { "full_name": "Moyra Coggins", "amount": null }, { "full_name": "Herculie Wapplington", "amount": "$1.48" }, { "full_name": "Freddie Longstaffe", "amount": "$0.54" }, { "full_name": "Rudolph Cleve", "amount": "$3.92" }, { "full_name": "Julee Ealles", "amount": "$4.14" }, { "full_name": "Valentijn Muir", "amount": "$8.22" }, { "full_name": "Valera Stonall", "amount": "$6.50" }, { "full_name": "Davon O'Gaven", "amount": "$6.82" }, { "full_name": "Birk Szepe", "amount": "$7.53" }, { "full_name": "Lenard Jan", "amount": "$7.84" }, { "full_name": "Jamal Devon", "amount": "$6.69" }, { "full_name": "Idaline Lafuente", "amount": null }, { "full_name": "Martie Iacovacci", "amount": "$2.05" }, { "full_name": "Angelico Frenchum", "amount": null }, { "full_name": "Fredra Berdale", "amount": "$3.08" }, { "full_name": "Boone Scriviner", "amount": "$3.16" }, { "full_name": "Anastasia Callf", "amount": null }];

    var service = {};
    var layouts = {}
    var header = {
        type: 'header', backgroundColor: 'rgb(0, 154, 166)',
        linkColor: '#ffffff',
        id: 'header',
        logo: 'http://ovarian.org/templates/nocc/images/logo.png',
        buttons: {

            signIn: {
                text: {
                    english: "Sign In",
                    french: "French Sign in"
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
            }
            //},


            //donate: {
            //    text: {
            //        english: "Donate",
            //        french: "Le Donate"
            //    },
            //    enabled: true,
            //    cssClass: 'btn fs-primary-btn fs-button'

            //}
        }
    };
    layouts.location = {};
    layouts.team = {};
    layouts.indvidual = {};

    layouts.event = {
        type: 'container-fluid',
        background: 'transparent',
        content: [
          header,
        {
            type: 'hero',
            backgroundImage: 'https://media2.charityengine.net/CMS/_templates/863/NOCC_2017_5K_RW_Banner7.png',
            id: 'hero',
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
//{
//    type: 'container',
//    backgroundColor: 'rgba(255,255,255,.7)',
//    id: 11,
//    content: [
//        {
//            type: 'content',
//            size: 'full',

//            id: 3
//        }
//    ]


//},





{
    type: 'container',
    backgroundColor: 'rgb(0,154,166,.8)',
    id: 12,
    content: [
        {

            type: 'content',
            size: 'sm',


            id: 6
        }, {
            type: 'video',
            size: 'lg',
            videoSource: 'youtube',
            videoId: 'm0LT_hHzoZc',


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
            size: 'sm',
            members: fakeFundraisers,
            heading: 'Top Individuals',
            bodyColor: '#444b55',
            id: 14


        },
          {
              type: 'leaderboard',
              source: 'team',
              size: 'sm',
              heading: 'Top Teams',
              members: fakeTeams,
              bodyColor: '#444b55',
              id: 15

          }
          ,
          {
              type: 'donations',
              size: 'sm',
              heading: 'Recent Donations',
              donations: fakeDonations,
              bodyColor: '#444b55',
              id: 999999

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


}, {
    type: 'container',
    backgroundColor: '#22c2d2',
    id: 16,
    content: [
        {
            type: 'donors',
            size: 'half',
            id: 44444
        }
    ]


},
    {
        type: 'footer',

        id: 17
        // backgroundColor: '#353535'
    }]
    };

    layouts.location = {
        pageType: 'location',
        type: 'container-fluid',
        background: 'transparent',
        content: [
          header,
        {
            type: 'hero',
            backgroundImage: 'https://media2.charityengine.net/WF/_transactionServerFiles/863/2016/12/15/2017_DCMETRO_BANNER.PNG',
            location: "Washington, D.C.",
            date: "May 7, 2018",
            id: 'hero',
            width: 'full',
            progressBar:
    {
        enabled: true,
        includeUnverified: 'true'
    },
            buttons: {
                donate: {
                    text: {
                        english: "Donate",
                        french: "Donner maintenant"
                    },
                    enabled: true
                },
                register: {
                    text: {
                        english: "Register",
                        french: "Trouvez votre promenade"
                    },
                    enabled: true

                }
            }

        },
{
    type: 'container',
    id: 11,
    content: [
    {
        type: 'container',
        size: 'lg',
        backgroundColor: '#fff',
        content:
        [
             {
                 type: 'content',
                 size: 'full',
                 id: 9
             },
             {
                 type: 'video',
                 size: 'full',
                 backgroundColor: 'rgb(0, 154, 166)',
                 id: 7
             }, {

                 type: 'content',
                 size: 'full',
                 id: 10,
                 backgroundColor: '#f0f0f0'
             }

        ]
    }, {

        type: 'container',
        size: 'sm',

        content: [
       {
           type: 'leaderboard',
           source: 'individual',
           size: 'full',
           members: fakeFundraisers,
           heading: 'Top Individuals',
           bodyColor: '#444b55',
           id: 14


       },
         {
             type: 'leaderboard',
             source: 'team',
             size: 'sm',
             heading: 'Top Teams',
             members: fakeTeams,
             bodyColor: '#444b55',
             id: 15

         }

        ]
    }
    ]


}, {
    type: 'container',
    id: 13


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

        id: 17
        // backgroundColor: '#353535'
    }]
    };

    layouts.singlelocation = angular.copy(layouts.location);
    layouts.singlelocation.pageType = 'singlelocation';
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


    service.getLayout = function (i) {

        return layouts[i];
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
    return service;
})