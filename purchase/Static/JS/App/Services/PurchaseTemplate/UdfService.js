(function () {
    'use strict';

    angular.module('PurchaseTemplate')
    .service('UdfService', UdfService);

    UdfService.$inject = ['UdfRepository'];
    function UdfService(UdfRepository) {
        var service = {
            udfs: undefined,
            setUdfs: setUdfs,
            getUdf: getUdf,
            getUdfs: getUdfs
        };

        return service;
        function setUdfs(udfs) {
            var udfsFormatted = [];
            var udfsFormattedAnswers = [];

            udfs.regudfquestions.rows.forEach(function (e) {
                var i = 0;
                var temp = {};
                e.forEach(function(udf) {
                    temp[udfs.regudfquestions.columns[i]] = udf;
                    i++;
                });
                udfsFormatted.push(temp);                
            });

            // Retrieve available answers for a given udf if they exist
            udfs.regudfanswers.rows.forEach(function (e) {
                var i = 0;
                var temp = {};
                e.forEach(function(answer) {
                    temp[udfs.regudfanswers.columns[i]] = answer;
                    i++;
                });
                udfsFormattedAnswers.push(temp);
            });

            service.udfs = udfsFormatted;
            service.udfAnswers = udfsFormattedAnswers;

            // Add the available answers for a given question as part of the JSON response data
            for (var i = 0; i < service.udfs.length; i++) {
                // Setting this variable here specifically so that each udf has an individualized set of available answers
                var availableAnswers = [];

                // Check if each answer has a question ID that matches an existing top-level question, 
                // then add it to the availableAnswers node
                for (var j = 0; j < service.udfAnswers.length; j++) {
                    if (service.udfAnswers[j].questionID === service.udfs[i].QuestionID) {
                        availableAnswers.push(service.udfAnswers[j].answer);
                        service.udfs[i]["availableAnswers"] = availableAnswers;

                        var subUdfQuestion = {};
                        var subUdfQuestions = [];
                        var filteredSubUdfs = [];
                        var availableSubUdfAnswers = [];

                        // Filter by dropdown or checkbox and retrieve sub-udf info (at the time of writing - mid 2017 - 
                        // only these 2 types of inputs are allowed to have follow-up questions AKA. sub-udfs)
                        if (service.udfs[i].typeName == "Drop Down" || (service.udfs[i].typeName == "Check Box")) {
                            // loop through all top-level udfs to find sub-udfs based on followUpQuestionID attribute
                            for (var subUdf = 0; subUdf < service.udfs.length; subUdf++) {
                                if (service.udfs[subUdf].followUpExist == "n" &&
                                    (service.udfAnswers[j].followUpQuestionID != 0) &&
                                    (service.udfAnswers[j].followUpQuestionID === service.udfs[subUdf].QuestionID)) {

                                    // A sub-udf exists, so create the data object
                                    subUdfQuestion["followUpQuestionExternalID"] = service.udfs[subUdf].ExternalQuestionID;
                                    subUdfQuestion["followUpQuestionName"] = service.udfs[subUdf].questionName;
                                    subUdfQuestion["followUpQuestionText"] = service.udfs[subUdf].questionText;
                                    subUdfQuestion["followUpQuestionType"] = service.udfs[subUdf].typeName;
                                    subUdfQuestion["followUpQuestionVisible"] = service.udfs[subUdf].visible;
                                    subUdfQuestion["followUpQuestionRequired"] = service.udfs[subUdf].IsMandatory;
                                    subUdfQuestion["followUpQuestionTriggerAnswer"] = service.udfAnswers[j].answer;
                                    // Save sub-udf for current top-level question (sub-udfs are triggered by specific answers)
                                    subUdfQuestions.push(subUdfQuestion);

                                    // Save sub-udf info, add it to matching top-level udf
                                    for (var currentQuestion = 0; currentQuestion < subUdfQuestions.length; currentQuestion++) {
                                        // Verifying that object exists and is not empty
                                        if (typeof subUdfQuestions[currentQuestion] != undefined &&
                                            (typeof subUdfQuestions[currentQuestion] == 'object') && subUdfQuestions[currentQuestion]["followUpQuestionExternalID"] != undefined) {

                                            filteredSubUdfs = subUdfQuestions.filter(function (value, index) {
                                                return subUdfQuestions.indexOf(value) == index;
                                            });
                                        }
                                    }
                                    service.udfs[i]["availableAnswers"].push(filteredSubUdfs);

                                    // Retrieve sub-udf answers
                                    for (var subUdfAnswer = 0; subUdfAnswer < service.udfAnswers.length; subUdfAnswer++) {
                                        if (service.udfAnswers[subUdfAnswer].questionID === service.udfs[subUdf].QuestionID) {
                                            availableSubUdfAnswers.push(service.udfAnswers[subUdfAnswer].answer);
                                            subUdfQuestion["availableAnswers"] = availableSubUdfAnswers;
                                        }
                                    }
                                    // This is required for proper retrieval of sub-udf question & answer(s)
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            return service.udfs;
        }
        function getUdf(QuestionID) {
            if (service.udfs)
                return service.udfs.find(function (x) {
                    return x.QuestionID === QuestionID
                });
        }

        function getUdfs() {
            return service.udfs
        }

    }
})();
