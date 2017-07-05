<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="purchaseInformation.aspx.cs" Inherits="PurchaseTemplate.Static.Templates.PurchaseTemplate.purchaseInformation" %>

<!-- -->
<!-- -->
<asp:Panel class="col-lg-7 col-md-6 col-sn-12 col-xs-12 pull-left" data-ng-init="init()">
                <asp:Panel class="purchase-items-checkout">
                    <form clientidmode="Static" id="checkoutForm" name="checkoutForm" novalidate accessibleform runat="server">
                        <section>
                            <h2>
                                <asp:literal meta:resourcekey="shippingInformationHeading" runat="server" />
                            </h2>
                            <fieldset>
                                <div class="row">
                                    <asp:Panel meta:resourcekey="shippingTitle" runat="server" class="col-xs-12 col-sm-2 form-group" >
                                        <asp:DropDownList id="shippingTitle" name="shippingTitle"
                                        class="form-control" ng-model="checkoutCtrl.shipping.title" runat="server">
                                            <asp:ListItem ng-repeat="x in checkoutCtrl.titles" value="{{x.TitleID}}" >{{x.title}}</asp:ListItem>
                                        </asp:DropDownList>
                                    </asp:Panel>
                                    <div class="col-xs-12 form-group" ng-class="{'col-sm-6': '<%= shippingTitle.Visible %>' == 'False', 'col-sm-4': '<%= shippingTitle.Visible %>' == 'True', 'has-error': checkoutForm.shippingFirstName.$invalid && !checkoutForm.shippingFirstName.$pristine}">
                                        <asp:requiredfieldvalidator id="rfvFirstName" controltovalidate="shippingFirstName" meta:resourcekey="rfvFirstName" name="rfvFirstName"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingFirstName" cssclass="form-control" ng-model="checkoutCtrl.shipping.firstName"
                                            meta:resourcekey="shippingFirstName"  runat="server" ng-required="true" autofocus/>
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingFirstName.$invalid && !checkoutForm.shippingFirstName.$pristine"></span>
                                        <label ng-show="checkoutForm.shippingFirstName.$invalid && !checkoutForm.shippingFirstName.$pristine" class="help-block"><%= rfvFirstName.ErrorMessage %></label>
                                    </div>
                                     <asp:Panel  meta:resourcekey="shippingMiddleName" runat="server" class="col-xs-12 col-sm-6 form-group" ng-class="{true: 'has-error'}[checkoutForm.shippingMiddleName.$invalid && !checkoutForm.shippingMiddleName.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvMiddleName" controltovalidate="shippingMiddleName" meta:resourcekey="rfvMiddleName" name="rfvMiddleName"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingMiddleName" cssclass="form-control"  ng-model="checkoutCtrl.shipping.middleName" 
                                            meta:resourcekey="shippingMiddleName" runat="server"  />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingMiddleName.$invalid && !checkoutForm.shippingMiddleName.$pristine"></span>   
                                        <label ng-show="checkoutForm.shippingMiddleName.$invalid && !checkoutForm.shippingMiddleName.$pristine" class="help-block"><%= rfvMiddleName.ErrorMessage %></label>                                    
                                    </asp:Panel>
                                    <div ng-if="'<%= shippingMiddleName.Visible %>' == 'True'"class="row"></div>
                                    <div class="col-xs-12 col-sm-6 form-group" ng-class="{true: 'has-error'}[checkoutForm.shippingLastName.$invalid && !checkoutForm.shippingLastName.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvLastName" controltovalidate="shippingLastName" meta:resourcekey="rfvLastName" name="rfvLastName" 
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingLastName" cssclass="form-control" ng-model="checkoutCtrl.shipping.lastName" 
                                            meta:resourcekey="shippingLastName" runat="server" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingLastName.$invalid && !checkoutForm.shippingLastName.$pristine"></span>
                                        <label ng-show="checkoutForm.shippingLastName.$invalid && !checkoutForm.shippingLastName.$pristine" class="help-block"><%= rfvLastName.ErrorMessage %></label>
                                    </div>
                                     <div  class="col-xs-12 form-group" ng-class="{'col-sm-12': '<%= shippingMiddleName.Visible %>' == 'False', 'col-sm-6': '<%= shippingMiddleName.Visible %>' == 'True'}">
                                         <select id="chosen-purchase-item-attr" name="chosen-purchase-item-attr"
                                            class="form-control" ng-required="true" ng-model="checkoutCtrl.shipping.addressType">
                                            <option id="Option1" meta:resourcekey="homeOption" runat="server" ></option>
                                            <option id="Option4" meta:resourcekey="workOption" runat="server" ></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-xs-12 col-sm-12 form-group" ng-class="{true: 'has-error'}[checkoutForm.shippingAddress1.$invalid && !checkoutForm.shippingAddress1.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvAddress1" controltovalidate="shippingAddress1" meta:resourcekey="rfvAddress1" name="rfvAddress1"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingAddress1" cssclass="form-control"  ng-model="checkoutCtrl.shipping.address1" 
                                            meta:resourcekey="shippingAddress1" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingAddress1.$invalid && !checkoutForm.shippingAddress1.$pristine"></span>  
                                        <label ng-show="checkoutForm.shippingAddress1.$invalid && !checkoutForm.shippingAddress1.$pristine" class="help-block"><%= rfvAddress1.ErrorMessage %></label>
                                    </div>
                                </div>
                                <asp:Panel meta:resourcekey="shippingAddress2" class="row" runat="server">
                                    <div class="col-xs-12 col-sm-12 form-group" show-errors>
                                        <asp:textbox id="shippingAddress2" cssclass="form-control"  ng-model="checkoutCtrl.shipping.address2" 
                                            meta:resourcekey="shippingAddress2" runat="server" />
                                    </div>
                                </asp:Panel>
                                <asp:Panel meta:resourcekey="shippingAddress3" class="row" runat="server">
                                    <div class="col-xs-12 col-sm-12 form-group" show-errors>
                                        <asp:textbox id="shippingAddress3" cssclass="form-control"  ng-model="checkoutCtrl.shipping.address3" 
                                            meta:resourcekey="shippingAddress3" runat="server" />
                                    </div>
                                </asp:Panel>
                                <asp:Panel meta:resourcekey="shippingAddress4" class="row" runat="server">
                                    <div class="col-xs-12 col-sm-12 form-group" show-errors>
                                        <asp:textbox id="shippingAddress4" cssclass="form-control"  ng-model="checkoutCtrl.shipping.address4" 
                                            meta:resourcekey="shippingAddress4" runat="server" />
                                    </div>
                                </asp:Panel>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-3 form-group" ng-class="{true: 'has-error'}[checkoutForm.shippingCity.$invalid && !checkoutForm.shippingCity.$pristine]">
                                       <asp:requiredfieldvalidator id="rfvCity" controltovalidate="shippingCIty" meta:resourcekey="rfvCity" name="rfvCity"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingCity"  cssclass="form-control" ng-model="chechoutCtrl.shipping.city"  
                                            meta:resourcekey="shippingCity" runat="server" ng-required="true"/>
                                          <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingCity.$invalid && !checkoutForm.shippingCity.$pristine"></span>  
                                          <label ng-show="checkoutForm.shippingCity.$invalid && !checkoutForm.shippingCity.$pristine" class="help-block"><%= rfvCity.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 form-group" show-errors>
                                        <select id="shippingCountry" name="shippingCountry"
                                            class="form-control" ng-required="true" ng-model="checkoutCtrl.shipping.country">
                                            <option ng-repeat="x in checkoutCtrl.countries" value="{{x.code}}" >{{x.name}}</option>
                                        </select>
                                    </div>
                                    <div class="col-xs-6 col-sm-3 form-group" ng-class="{true: 'has-error'}[checkoutForm.shippingProvinceState.$invalid && !checkoutForm.shippingProvinceState.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvProvinceState" controltovalidate="shippingProvinceState"  meta:resourcekey="rfvProvinceState" name="rfvProvinceState"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingProvinceState" cssclass="form-control" ng-model="checkoutCtrl.shipping.provinceState"
                                            meta:resourcekey="shippingProvinceState" runat="server" ng-required="checkoutCtrl.shipping.country =='US' || checkoutCtrl.shipping.country =='AU' || checkoutCtrl.shipping.country =='CA'" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingProvinceState.$invalid && !checkoutForm.shippingProvinceState.$pristine"></span>  
                                         <label ng-show="checkoutForm.shippingProvinceState.$invalid && !checkoutForm.shippingProvinceState.$pristine" class="help-block"><%= rfvProvinceState.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-6 col-sm-3 form-group" ng-class="{true: 'has-error'}[checkoutForm.shippingPostalZip.$error.pattern || checkoutCtrl.shipping.postalZip == '']">
                                        <asp:requiredfieldvalidator id="rfvValidatePostalZip" controltovalidate="shippingPostalZip"  meta:resourcekey="rfvValidatePostalZip" name="rfvValidatePostalZip"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingPostalZip" cssclass="form-control" ng-model="checkoutCtrl.shipping.postalZip"
                                            meta:resourcekey="shippingPostalZip" runat="server" ng-required="true" ng-pattern="checkoutCtrl.CheckoutValidationService.validatePostalZip(checkoutCtrl.shipping.country)"/>
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingPostalZip.$error.pattern || checkoutCtrl.shipping.postalZip == ''"></span>  
                                        <label ng-show="checkoutForm.shippingPostalZip.$error.pattern || checkoutCtrl.shipping.postalZip == ''" class="help-block"><%= rfvValidatePostalZip.ErrorMessage %></label>
                                    </div>
                                </div>
                                <div class="row" ng-if="'<%= shippingPhoneNumber.Visible %>' != 'False' || '<%= shippingCellPhoneNumber.Visible %>' != 'False'">
                                    <div class="col-xs-6 form-group" ng-class="{'has-error': checkoutForm.shippingPhoneNumber.$error.pattern || !checkoutForm.shippingPhoneNumber.$pristine, 'col-sm-12': '<%= shippingCellPhoneNumber.Visible %>' == 'False', 'col-sm-6': '<%= shippingCellPhoneNumber.Visible %>' == 'True'}">
                                        <asp:requiredfieldvalidator id="rfvValidatePhone" controltovalidate="shippingPhoneNumber"  meta:resourcekey="rfvValidatePhone" name="rfvValidatePhone"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingPhoneNumber" cssclass="form-control" ng-model="checkoutCtrl.shipping.phone" 
                                            meta:resourcekey="shippingPhoneNumber" runat="server" ng-required="true" ng-pattern="checkoutCtrl.CheckoutValidationService.validatePhoneNumber(checkoutCtrl.shipping.country)" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingPhoneNumber.$error.pattern || !checkoutForm.shippingPhoneNumber.$pristine"></span>  
                                        <label ng-show="checkoutForm.shippingPhoneNumber.$error.pattern || !checkoutForm.shippingPhoneNumber.$pristine" class="help-block"><%= rfvValidatePhone.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-6 form-group" ng-class="{'has-error': checkoutForm.shippingCellPhoneNumber.$invalid && !checkoutForm.shippingCellPhoneNumber.$pristine, 'col-sm-12': '<%= shippingPhoneNumber.Visible %>' == 'False', 'col-sm-6': '<%= shippingPhoneNumber.Visible %>' == 'True'}">
                                        <asp:requiredfieldvalidator id="rfvCellPhoneNumber" controltovalidate="shippingCellPhoneNumber"  meta:resourcekey="rfvCellPhoneNumber" name="rfvCellPhoneNumber"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingCellPhoneNumber" cssclass="form-control" ng-model="checkoutCtrl.shipping.cellPhone"
                                            meta:resourcekey="shippingCellPhoneNumber" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.shippingCellPhoneNumber.$invalid && !checkoutForm.shippingCellPhoneNumber.$pristine"></span>  
                                        <label ng-show="checkoutForm.shippingCellPhoneNumber.$invalid && !checkoutForm.shippingCellPhoneNumber.$pristine" class="help-block"><%= rfvCellPhoneNumber.ErrorMessage %></label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 form-group" ng-class="{true: 'has-error'}[checkoutCtrl.CheckoutValidationService.validateEmail(checkoutCtrl.shipping.email) == true]"> 
                                        <asp:requiredfieldvalidator id="rfvValidateEmail" controltovalidate="shippingEmail"  meta:resourcekey="rfvValidateEmail" name="rfvValidateEmail"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingEmail" cssclass="form-control" ng-model="checkoutCtrl.shipping.email"
                                            meta:resourcekey="shippingEmail" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutCtrl.CheckoutValidationService.validateEmail(checkoutCtrl.shipping.email) == true"></span>  
                                        <label ng-show="checkoutCtrl.CheckoutValidationService.validateEmail(checkoutCtrl.shipping.email) == true" class="help-block"><%= rfvValidateEmail.ErrorMessage %></label>
                                    </div>
                                    <asp:Panel meta:resourcekey="shippingConfirmEmail" runat="server" class="col-xs-6 form-group" ng-class="{true: 'has-error'}[checkoutCtrl.shipping.email != checkoutCtrl.shipping.confirmEmail]">
                                        <asp:requiredfieldvalidator id="rfvEmailsMatch" controltovalidate="shippingConfirmEmail"  meta:resourcekey="rfvEmailsMatch" name="rfvEmailsMatch"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="shippingConfirmEmail" cssclass="form-control" ng-model="checkoutCtrl.shipping.confirmEmail"
                                            meta:resourcekey="shippingConfirmEmail" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutCtrl.shipping.email != checkoutCtrl.shipping.confirmEmail"></span>  
                                        <label ng-show="checkoutCtrl.shipping.email != checkoutCtrl.shipping.confirmEmail" class="help-block"><%= rfvEmailsMatch.ErrorMessage %></label>
                                    </asp:Panel>
                                </div>
                            </fieldset>
                        </section>
                        <section ng-show="surveyQuestions && surveyQuestions.length > 0">
                            <h2>Additional Information</h2>

                            <div class="survey-questions form-group">
                                <div ng-if="surveyQuestion.QuestionTypeID != 'GiftAid'" ng-repeat="surveyQuestion in surveyQuestions track by $index" class="form-group">
                                    <%-- Inject appropriate markup based on typeName attribute for each survey question --%>
                                    
                                    <%-- Dropdown menus --%>
                                    <label ng-if="surveyQuestion.typeName == 'Drop Down' && surveyQuestion.visible == 'y'" for="{{surveyQuestion.ExternalQuestionID}}">{{surveyQuestion.questionText}}</label>
                                    <select ng-if="surveyQuestion.typeName == 'Drop Down' && surveyQuestion.visible == 'y'" ng-required="{{surveyQuestion.IsMandatory}}" name="{{surveyQuestion.ExternalQuestionID}}" id="{{surveyQuestion.ExternalQuestionID}}" class="form-control">
                                        <option ng-repeat="answer in surveyQuestion.availableAnswers track by $index" ng-hide="{{ answer | isArray }}" value="{{surveyQuestion.availableAnswers[$index]}}">{{surveyQuestion.availableAnswers[$index]}}</option>
                                    </select>

                                    <%-- Single line text input --%>
                                    <input ng-if="surveyQuestion.typeName == 'Text Line' && surveyQuestion.visible == 'y'" type="text" id="{{surveyQuestion.ExternalQuestionID}}" ng-required="{{surveyQuestion.IsMandatory}}" class="form-control" />

                                    <%-- Multiline text input (AKA Textarea) --%>
                                    <textarea ng-if="surveyQuestion.typeName == 'Text Area' && surveyQuestion.visible == 'y'" ng-required="{{surveyQuestion.IsMandatory}}" class="form-control">
                                    </textarea>

                                    <%-- Checkboxes --%>
                                    <p ng-if="surveyQuestion.typeName == 'Check Box' && surveyQuestion.visible == 'y'">{{surveyQuestion.questionText}}</p>
                                    <div ng-if="surveyQuestion.typeName == 'Check Box' && surveyQuestion.visible == 'y'" ng-repeat="answer in surveyQuestion.availableAnswers track by $index" ng-hide="{{ answer | isArray }}" class="checkbox">
                                        <input type="checkbox" id="{{surveyQuestion.ExternalQuestionID}}" value="{{surveyQuestion.availableAnswers[$index]}}" />
                                        <label for="{{surveyQuestion.ExternalQuestionID}}" ng-required="{{surveyQuestion.IsMandatory}}">{{surveyQuestion.availableAnswers[$index]}}</label>
                                    </div>

                                    <%-- Radio buttons --%>
                                    <p ng-if="surveyQuestion.typeName == 'Radio Button' && surveyQuestion.visible == 'y'">{{surveyQuestion.questionText}}</p>
                                    <div ng-if="surveyQuestion.typeName == 'Radio Button' && surveyQuestion.visible == 'y'" ng-repeat="answer in surveyQuestion.availableAnswers track by $index" class="radio">
                                        <label for="{{surveyQuestion.ExternalQuestionID}}">
                                            <input type="radio" name="{{surveyQuestion.ExternalQuestionID}}" value="{{surveyQuestion.availableAnswers[$index]}}"  />
                                            {{surveyQuestion.availableAnswers[$index]}}
                                        </label>
                                    </div>
                                    
                                    <%-- Date Inputs (Can exist in multiple formats) --%>
                                    <%-- dd/mm/yyyy format --%>
                                    <div ng-if="surveyQuestion.typeName == 'Date (dd/mm/yyyy)' && surveyQuestion.visible == 'y'" class="input-group">
                                        <p>{{surveyQuestion.questionText}}</p>
                                        <asp:textbox id="Textbox1" cssclass="form-control" ng-model="checkoutCtrl.creditCard.expiryMonthYear"
                                            meta:resourcekey="expiryCard" runat="server" ng-required="{{surveyQuestion.IsMandatory}}" uib-datepicker-popup="{{checkoutCtrl.format}}" is-open="checkoutCtrl.datePicker.opened" datepicker-options="checkoutCtrl.dateOptions" close-text="Close" alt-input-formats="checkoutCtrl.altInputFormats" />
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-default" ng-click="checkoutCtrl.datePicker.opened = true;"><i class="glyphicon glyphicon-calendar"></i></button>
                                        </span>
                                    </div>

                                    <%-- mm/dd/yyyy format --%>
                                    <div ng-if="surveyQuestion.typeName == 'Date (mm/dd/yyyy)' && surveyQuestion.visible == 'y'" class="input-group">
                                        <p>{{surveyQuestion.questionText}}</p>
                                        <asp:textbox id="Textbox2" cssclass="form-control" ng-model="checkoutCtrl.creditCard.expiryMonthYear"
                                            meta:resourcekey="expiryCard" runat="server" ng-required="{{surveyQuestion.IsMandatory}}" uib-datepicker-popup="{{checkoutCtrl.format}}" is-open="checkoutCtrl.datePicker.opened" datepicker-options="checkoutCtrl.dateOptions" close-text="Close" alt-input-formats="checkoutCtrl.altInputFormats" />
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-default" ng-click="checkoutCtrl.datePicker.opened = true;"><i class="glyphicon glyphicon-calendar"></i></button>
                                        </span>
                                    </div>


                                    <%-- Retrieve follow up question if applicable --%>
                                    <div ng-repeat="followUpQuestions in surveyQuestion.availableAnswers track by $index" ng-show="{{ followUpQuestions | isArray }}">
                                        <div ng-if="followUpQuestions.length > 0">
                                            <div ng-repeat="question in followUpQuestions track by $index">
                                                <div ng-show="{{ question | isObject }}">
                                                    <%-- Handle creation of follow up question markup based on type --%>

                                                    <%-- Drop down menu --%>
                                                    <label ng-if="question.followUpQuestionType == 'Drop Down'" for="{{question.followUpQuestionExternalID}}" data-trigger="{{question.followUpQuestionTriggerAnswer}}">{{question.followUpQuestionText}}</label>
                                                    <select ng-if="question.followUpQuestionType == 'Drop Down'" ng-required="{{question.followUpQuestionRequired}}" name="{{question.followUpQuestionExternalID}}" id="{{question.followUpQuestionExternalID}}" data-trigger="{{question.followUpQuestionTriggerAnswer}}" class="form-control">
                                                        <option ng-repeat="followUpAnswer in question.availableAnswers track by $index" value="{{question.availableAnswers[$index]}}">{{question.availableAnswers[$index]}}</option>
                                                    </select>

                                                    <%-- Single line text input --%>
                                                    <label ng-if="question.followUpQuestionType == 'Text Line'" for="{{question.followUpQuestionExternalID}}" data-trigger="{{question.followUpQuestionTriggerAnswer}}">{{question.followUpQuestionText}}</label>
                                                    <input ng-if="question.followUpQuestionType == 'Text Line'" type="text" id="{{question.followUpQuestionExternalID}}" ng-required="{{question.followUpQuestionRequired}}" data-trigger="{{question.followUpQuestionTriggerAnswer}}" class="form-control" />
                                                    
                                                    <%-- Multiline text input (AKA Textarea) --%>
                                                    <textarea ng-if="question.followUpQuestionType == 'Text Area'" ng-required="{{question.followUpQuestionRequired}}" data-trigger="{{question.followUpQuestionTriggerAnswer}}" class="form-control">
                                                    </textarea>

                                                    <%-- Checkboxes --%>
                                                    <p ng-if="question.followUpQuestionType == 'Check Box'" data-trigger="{{question.followUpQuestionTriggerAnswer}}">{{question.followUpQuestionText}}</p>
                                                    <div ng-if="question.followUpQuestionType == 'Check Box'" ng-repeat="followUpAnswer in question.availableAnswers track by $index" data-trigger="{{question.followUpQuestionTriggerAnswer}}" class="checkbox">
                                                        <input type="checkbox" id="{{question.followUpQuestionExternalID}}" value="{{question.availableAnswers[$index]}}" />
                                                        <label for="{{question.followUpQuestionExternalID}}" ng-required="{{question.followUpQuestionRequired}}">{{question.availableAnswers[$index]}}</label>
                                                    </div>

                                                    <%-- Radio buttons --%>
                                                    <p ng-if="question.followUpQuestionType == 'Radio Button'" data-trigger="{{question.followUpQuestionTriggerAnswer}}">{{question.followUpQuestionText}}</p>
                                                    <div ng-if="question.followUpQuestionType == 'Radio Button'" ng-repeat="followUpAnswer in question.availableAnswers track by $index" data-trigger="{{question.followUpQuestionTriggerAnswer}}" class="radio">
                                                        <label for="{{question.followUpQuestionExternalID}}">
                                                            <input type="radio" name="{{question.followUpQuestionExternalID}}" value="{{question.availableAnswers[$index]}}"  />
                                                            {{question.availableAnswers[$index]}}
                                                        </label>
                                                    </div>

                                                    <%-- Date Inputs (Can exist in multiple formats) --%>
                                                    <%-- dd/mm/yyyy format --%>
                                                    <div ng-if="question.followUpQuestionType == 'Date (dd/mm/yyyy)'" data-trigger="{{question.followUpQuestionTriggerAnswer}}" class="input-group">
                                                        <p>{{question.followUpQuestionText}}</p>
                                                        <asp:textbox id="Textbox3" cssclass="form-control" ng-model="checkoutCtrl.creditCard.expiryMonthYear"
                                                            meta:resourcekey="expiryCard" runat="server" ng-required="{{question.followUpQuestionRequired}}" uib-datepicker-popup="{{checkoutCtrl.format}}" is-open="checkoutCtrl.datePicker.opened" datepicker-options="checkoutCtrl.dateOptions" close-text="Close" alt-input-formats="checkoutCtrl.altInputFormats" />
                                                        <span class="input-group-btn">
                                                            <button type="button" class="btn btn-default" ng-click="checkoutCtrl.datePicker.opened = true;"><i class="glyphicon glyphicon-calendar"></i></button>
                                                        </span>
                                                    </div>

                                                    <%-- mm/dd/yyyy format --%>
                                                    <div ng-if="question.followUpQuestionType == 'Date (mm/dd/yyyy)'" data-trigger="{{question.followUpQuestionTriggerAnswer}}" class="input-group">
                                                        <p>{{question.followUpQuestionText}}</p>
                                                        <asp:textbox id="Textbox4" cssclass="form-control" ng-model="checkoutCtrl.creditCard.expiryMonthYear"
                                                            meta:resourcekey="expiryCard" runat="server" ng-required="{{question.followUpQuestionRequired}}" uib-datepicker-popup="{{checkoutCtrl.format}}" is-open="checkoutCtrl.datePicker.opened" datepicker-options="checkoutCtrl.dateOptions" close-text="Close" alt-input-formats="checkoutCtrl.altInputFormats" />
                                                        <span class="input-group-btn">
                                                            <button type="button" class="btn btn-default" ng-click="checkoutCtrl.datePicker.opened = true;"><i class="glyphicon glyphicon-calendar"></i></button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <fieldset ng-show="!checkoutCtrl.shippAsBill">
                                <h2>
                                    <asp:literal meta:resourcekey="billingInformationHeading" runat="server" />
                                </h2>
                                <div class="row">
                                    <asp:Panel meta:resourcekey="billingTitle" runat="server" class="col-xs-12 col-sm-2 form-group" show-errors>
                                        <asp:DropDownList id="billingTitle" runat="server" name="chosen-purchase-item-attr"
                                        class="form-control"  ng-model="checkoutCtrl.billing.title">
                                            <asp:ListItem ng-repeat="x in checkoutCtrl.titles" value="{{x.TitleID}}" >{{x.title}}</asp:ListItem>
                                        </asp:DropDownList>
                                    </asp:Panel>
                                    <div class="col-xs-12  form-group" ng-class="{'col-sm-6': '<%= billingTitle.Visible %>' == 'False', 'col-sm-4': '<%= billingTitle.Visible %>' == 'True', 'has-error': checkoutForm.billingFirstName.$invalid && !checkoutForm.billingFirstName.$pristine}">
                                        <asp:requiredfieldvalidator id="rfvFirstName2" controltovalidate="billingFirstName" meta:resourcekey="rfvFirstName" name="rfvFirstName"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingFirstName" cssclass="form-control" ng-model="checkoutCtrl.billing.firstName"
                                            meta:resourcekey="billingFirstName"  runat="server" ng-required="true" autofocus/>
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingFirstName.$invalid && !checkoutForm.billingFirstName.$pristine"></span>  
                                        <label ng-show="checkoutForm.billingFirstName.$invalid && !checkoutForm.billingFirstName.$pristine" class="help-block"><%= rfvFirstName.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 form-group" ng-class="{true: 'has-error'}[checkoutForm.billingMiddleName.$invalid && !checkoutForm.billingMiddleName.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvMiddleNameBilling" controltovalidate="billingMiddleName" meta:resourcekey="rfvMiddleName" name="rfvMiddleName"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingMiddleName" cssclass="form-control"  ng-model="checkoutCtrl.billing.middleName" 
                                            meta:resourcekey="billingMiddleName" runat="server"/>
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingMiddleName.$invalid && !checkoutForm.billingMiddleName.$pristine"></span>    
                                         <label ng-show="checkoutForm.billingMiddleName.$invalid && !checkoutForm.billingMiddleName.$pristine" class="help-block"><%= rfvMiddleNameBilling.ErrorMessage %></label>                                     
                                    </div>
                                    <div ng-if="'<%= billingMiddleName.Visible %>' == 'True'"class="row"></div>
                                    <div class="col-xs-12 col-sm-6 form-group" ng-class="{true: 'has-error'}[checkoutForm.billingLastName.$invalid && !checkoutForm.billingLastName.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvLastNameBilling" controltovalidate="billingLastName" meta:resourcekey="rfvLastName" name="rfvLastName" 
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingLastName" cssclass="form-control" ng-model="checkoutCtrl.billing.lastName" 
                                            meta:resourcekey="billingLastName" runat="server" ng-required="true"/>
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingLastName.$invalid && !checkoutForm.billingLastName.$pristine"></span>  
                                        <label ng-show="checkoutForm.billingLastName.$invalid && !checkoutForm.billingLastName.$pristine" class="help-block"><%= rfvLastName.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 form-group" ng-class="{'col-sm-12': '<%= billingMiddleName.Visible %>' == 'False', 'col-sm-6': '<%= billingMiddleName.Visible %>' == 'True'}">
                                         <select id="Select2" name="chosen-purchase-item-attr"
                                            class="form-control" ng-required="true" ng-model="checkoutCtrl.billing.addressType">
                                            <option id="Option2" meta:resourcekey="homeOption" runat="server" ></option>
                                            <option id="Option3" meta:resourcekey="workOption" runat="server" ></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 form-group" ng-class="{true: 'has-error'}[checkoutForm.billingAddress1.$invalid && !checkoutForm.billingAddress1.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvAddress1Billing" controltovalidate="billingAddress1" meta:resourcekey="rfvAddress1" name="rfvAddress1"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingAddress1" cssclass="form-control"  ng-model="checkoutCtrl.billing.address1" 
                                            meta:resourcekey="billingAddress1" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingAddress1.$invalid && !checkoutForm.billingAddress1.$pristine"></span>    
                                        <label ng-show="checkoutForm.billingAddress1.$invalid && !checkoutForm.billingAddress1.$pristine" class="help-block"><%= rfvAddress1.ErrorMessage %></label>
                                    </div>
                                </div>
                                <asp:Panel meta:resourcekey="billingAddress2" runat="server" class="row">
                                    <div class="col-xs-12 col-sm-12 form-group" show-errors>
                                        <asp:textbox id="billingAddress2" cssclass="form-control"  ng-model="checkoutCtrl.billing.address2" 
                                            meta:resourcekey="billingAddress2" runat="server" />
                                    </div>
                                </asp:Panel>
                                <asp:Panel meta:resourcekey="billingAddress3" runat="server" class="row">
                                    <div class="col-xs-12 col-sm-12 form-group" show-errors>
                                        <asp:textbox id="billingAddress3" cssclass="form-control"  ng-model="checkoutCtrl.billing.address3" 
                                            meta:resourcekey="billingAddress3" runat="server" />
                                    </div>
                                </asp:Panel>
                                <asp:Panel meta:resourcekey="billingAddress4" runat="server" class="row">
                                    <div class="col-xs-12 col-sm-12 form-group" show-errors>
                                        <asp:textbox id="billingAddress4" cssclass="form-control"  ng-model="checkoutCtrl.billing.address4" 
                                            meta:resourcekey="billingAddress4" runat="server" />
                                    </div>
                                </asp:Panel>
                                <div class="row">
                                    <div class="col-xs-12 col-sm-3 form-group" ng-class="{true: 'has-error'}[checkoutForm.billingCity.$invalid && !checkoutForm.billingCity.$pristine]">
                                       <asp:requiredfieldvalidator id="rfvCityBilling" controltovalidate="billingCity" meta:resourcekey="rfvCity" name="rfvCity"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingCity"  cssclass="form-control" ng-model="chechoutCtrl.billing.city"  
                                            meta:resourcekey="billingCity" runat="server" ng-required="true"/>
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingCity.$invalid && !checkoutForm.billingCity.$pristine"></span>    
                                        <label ng-show="checkoutForm.billingCity.$invalid && !checkoutForm.billingCity.$pristine" class="help-block"><%= rfvCity.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-12 col-sm-3 form-group" show-errors>
                                        <select id="Select4" name="shippingCountry"
                                            class="form-control" ng-required="true" ng-model="checkoutCtrl.billing.country">
                                            <option ng-repeat="x in checkoutCtrl.countries" value="{{x.code}}" >{{x.name}}</option>
                                        </select>
                                    </div>
                                    <div class="col-xs-6 col-sm-3 form-group" ng-class="{true: 'has-error'}[checkoutForm.billingProvinceState.$invalid && !checkoutForm.billingProvinceState.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvProvinceStateBilling" controltovalidate="billingProvinceState"  meta:resourcekey="rfvProvinceState" name="rfvProvinceState"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingProvinceState" cssclass="form-control" ng-model="checkoutCtrl.billing.provinceState"
                                            meta:resourcekey="billingProvinceState" runat="server" ng-required="checkoutCtrl.billing.country =='US' || checkoutCtrl.billing.country =='AU' || checkoutCtrl.billing.country =='CA'" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingProvinceState.$invalid && !checkoutForm.billingProvinceState.$pristine"></span>  
                                         <label ng-show="checkoutForm.billingProvinceState.$invalid && !checkoutForm.billingProvinceState.$pristine" class="help-block"><%= rfvProvinceState.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-6 col-sm-3 form-group" show-errors>
                                        <asp:requiredfieldvalidator id="rfvValidatePostalZip1" controltovalidate="billingPostalZip"  meta:resourcekey="rfvValidatePostalZip" name="rfvValidatePostalZip1"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingPostalZip" cssclass="form-control" ng-model="checkoutCtrl.billing.postalZip"
                                            meta:resourcekey="billingPostalZip" runat="server" ng-required="true" ng-pattern="checkoutCtrl.CheckoutValidationService.validatePostalZip(checkoutCtrl.shipping.country)"/>
                                         <label ng-show="checkoutForm.billingPostalZip.$error.pattern || checkoutCtrl.billing.postalZip == ''" class="help-block"><%= rfvValidatePostalZip.ErrorMessage %></label>
                                    </div>
                                </div>
                                <div class="row" ng-if="'<%= billingPhoneNumber.Visible %>' != 'False' || '<%= billingCellPhoneNumber.Visible %>' != 'False'">
                                    <div class="col-xs-6 form-group" ng-class="{'col-sm-12': '<%= billingCellPhoneNumber.Visible %>' == 'False', 'col-sm-6': '<%= billingCellPhoneNumber.Visible %>' == 'True','has-error': checkoutForm.billingPhoneNumber.$error.pattern || !checkoutForm.billingPhoneNumber.$pristine}">
                                        <asp:requiredfieldvalidator id="rfvValidatePhone1" controltovalidate="billingPhoneNumber"  meta:resourcekey="rfvValidatePhone" name="rfvValidatePhone"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingPhoneNumber" cssclass="form-control" ng-model="checkoutCtrl.billing.phone"
                                            meta:resourcekey="billingPhoneNumber" runat="server" ng-required="true" ng-pattern="checkoutCtrl.CheckoutValidationService.validatePhoneNumber(checkoutCtrl.billing.country)" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingPhoneNumber.$error.pattern || !checkoutForm.billingPhoneNumber.$pristine"></span>  
                                        <label ng-show="checkoutForm.billingPhoneNumber.$error.pattern || !checkoutForm.billingPhoneNumber.$pristine" class="help-block"><%= rfvValidatePhone.ErrorMessage %></label>
                                    </div>
                                    <div class="col-xs-6 form-group" ng-class="{'col-sm-12': '<%= billingPhoneNumber.Visible %>' == 'False', 'col-sm-6': '<%= billingPhoneNumber.Visible %>' == 'True','has-error':checkoutForm.billingCellPhoneNumber.$invalid && !checkoutForm.billingCellPhoneNumber.$pristine}">
                                        <asp:requiredfieldvalidator id="rfvCellPhoneNumberBilling" controltovalidate="billingCellPhoneNumber"  meta:resourcekey="rfvCellPhoneNumber" name="rfvCellPhoneNumber"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingCellPhoneNumber" cssclass="form-control" ng-model="checkoutCtrl.billing.cellPhone"
                                            meta:resourcekey="billingCellPhoneNumber" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.billingCellPhoneNumber.$invalid && !checkoutForm.billingCellPhoneNumber.$pristine"></span>
                                        <label ng-show="checkoutForm.billingCellPhoneNumber.$invalid && !checkoutForm.billingCellPhoneNumber.$pristine" class="help-block"><%= rfvCellPhoneNumber.ErrorMessage %></label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-6 form-group" ng-class="{true: 'has-error'}[checkoutCtrl.CheckoutValidationService.validateEmail(checkoutCtrl.billing.email) == true]"> 
                                        <asp:requiredfieldvalidator id="rfvValidateEmailBilling" controltovalidate="billingEmail"  meta:resourcekey="rfvValidateEmail" name="rfvValidateEmail"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingEmail" cssclass="form-control" ng-model="checkoutCtrl.billing.email"
                                            meta:resourcekey="billingEmail" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutCtrl.CheckoutValidationService.validateEmail(checkoutCtrl.billing.email) == true"></span>  
                                        <label ng-show="checkoutCtrl.CheckoutValidationService.validateEmail(checkoutCtrl.billing.email) == true" class="help-block"><%= rfvValidateEmail.ErrorMessage %></label>
                                    </div>
                                    <asp:Panel runat="server" meta:resourcekey="billingConfirmEmail" class="col-xs-6 form-group" ng-class="{true: 'has-error'}[checkoutCtrl.billing.email != checkoutCtrl.billing.confirmEmail]">
                                        <asp:requiredfieldvalidator id="rfvEmailsMatchBilling" controltovalidate="billingConfirmEmail"  meta:resourcekey="rfvEmailsMatch" name="rfvValidateEmailsMatch"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="billingConfirmEmail" cssclass="form-control" ng-model="checkoutCtrl.billing.confirmEmail"
                                            meta:resourcekey="billingConfirmEmail" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutCtrl.billing.email != checkoutCtrl.billing.confirmEmail"></span>  
                                        <label ng-show="checkoutCtrl.billing.email != checkoutCtrl.billing.confirmEmail" class="help-block" class="help-block"><%= rfvEmailsMatch.ErrorMessage %></label>
                                    </asp:Panel>
                                </div>
                            </fieldset>
                        </section>
                        <section>
                            <fieldset>
                                <div class="row">
                                    <div class="col-md-2 sm-hidden xs-hidden"></div>
                                        <div class="col-md-8 col-sm-12 col-xs-12">
                                            <div class="btn-group btn-group-justified ">
                                                <div class="btn-group" >
                                                    <button class="btn btn-default " ng-class="'active'">
                                                        <i class="zmdi zmdi-card btn-icon-lg"></i>
                                                        <small>
                                                            <asp:literal meta:resourcekey="creditCardLabel" runat="server" />
                                                        </small>
                                                    </button>
                                                </div>
                                                <div class="btn-group">
                                                    <a class="btn btn-default">
                                                        <i class="zmdi zmdi-paypal btn-icon-lg"></i>
                                                            <small>
                                                                <asp:literal meta:resourcekey="payPalLabel" runat="server" />
                                                            </small>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="col-md-2 sm-hidden xs-hidden"></div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-md-12 form-group" ng-class="{true: 'has-error'}[checkoutForm.nameOnCard.$invalid && !checkoutForm.nameOnCard.$pristine]">
                                        <asp:requiredfieldvalidator id="rfvNameOnCard" controltovalidate="nameOnCard"  meta:resourcekey="rfvNameOnCard" name="rfvNameOnCard"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="nameOnCard" cssclass="form-control" ng-model="checkoutCtrl.creditCard.nameOncard"
                                            meta:resourcekey="nameOnCard" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.nameOnCard.$invalid && !checkoutForm.nameOnCard.$pristine"></span>  
                                        <label ng-show="checkoutForm.nameOnCard.$invalid && !checkoutForm.nameOnCard.$pristine" class="help-block"><%= rfvNameOnCard.ErrorMessage %></label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-xs-12 form-group" ng-class="{true: 'has-error'}[checkoutForm.numberCard.$invalid && !checkoutForm.numberCard.$pristine || checkoutCtrl.CheckoutValidationService.validateCcNumber(checkoutCtrl.creditCard.cardNumber) == true]">
                                        <asp:requiredfieldvalidator id="rfvCardNumber" controltovalidate="cardNumber"  meta:resourcekey="rfvCardNumber" name="rfvCardNumber"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="cardNumber" cssclass="form-control" ng-model="checkoutCtrl.creditCard.cardNumber"
                                            meta:resourcekey="cardNumber" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.numberCard.$invalid && !checkoutForm.numberCard.$pristine || checkoutCtrl.CheckoutValidationService.validateCcNumber(checkoutCtrl.creditCard.cardNumber) == true"></span>  
                                         <label ng-show="checkoutForm.numberCard.$invalid && !checkoutForm.numberCard.$pristine || checkoutCtrl.CheckoutValidationService.validateCcNumber(checkoutCtrl.creditCard.cardNumber) == true" 
                                             class="help-block"><%= rfvCardNumber.ErrorMessage %></label>
                                    </div>
                                    <div class="col-md-3 col-xs-7 form-group" show-errors>
                                        <div class="input-group">
                                                <asp:textbox id="expiryCard" cssclass="form-control" ng-model="checkoutCtrl.creditCard.expiryMonthYear"
                                                meta:resourcekey="expiryCard" runat="server" ng-required="true" uib-datepicker-popup="{{checkoutCtrl.format}}" is-open="checkoutCtrl.datePicker.opened" datepicker-options="checkoutCtrl.dateOptions" close-text="Close" alt-input-formats="checkoutCtrl.altInputFormats" />
                                                <span class="input-group-btn">
                                                    <button type="button" class="btn btn-default" ng-click="checkoutCtrl.datePicker.opened = true;"><i class="glyphicon glyphicon-calendar"></i></button>
                                                </span>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-xs-5" ng-class="{true: 'has-error'}[checkoutForm.cvc.$invalid && !checkoutForm.cvc.$pristine || checkoutCtrl.CheckoutValidationService.validateCVC(checkoutCtrl.creditCard.cardCVC) == true]">
                                         <asp:requiredfieldvalidator id="rfvCvc" controltovalidate="cvc"  meta:resourcekey="rfvCvc" name="rfvCvc"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="cvc" cssclass="form-control" ng-model="checkoutCtrl.creditCard.cardCVC"
                                            meta:resourcekey="cvc" runat="server" ng-required="true" />
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback"  ng-show="checkoutForm.cvc.$invalid && !checkoutForm.cvc.$pristine || checkoutCtrl.CheckoutValidationService.validateCVC(checkoutCtrl.creditCard.cardCVC) == true"></span>  
                                        <label ng-show="checkoutForm.cvc.$invalid && !checkoutForm.cvc.$pristine || checkoutCtrl.CheckoutValidationService.validateCVC(checkoutCtrl.creditCard.cardCVC) == true" 
                                             class="help-block"><%= rfvCvc.ErrorMessage %></label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="cross-sell text-left">
                                        <div  class="cross-sell-item" ng-repeat="card in checkoutCtrl.EventService.paygateways"> 
                                            <img class="watermark" src="{{card.logoUrl}}" alt="..." ng-class="{highlight: checkoutCtrl.CheckoutValidationService.GetCardType(checkoutCtrl.creditCard.cardNumber) == card.CreditCardTypeID}">
                                        </div>
                                    </div>
                                </div>
                                <label>
                                    <input type="checkbox" ng-model="checkoutCtrl.shippAsBill" ng-change="checkoutCtrl.changeData()"checked />
                                    <asp:literal meta:resourcekey="shippAsBill" runat="server" />
                                </label>
                                <a ng-click="checkoutCtrl.validate()" class="btn btn-primary btn-block btn-lg" ><asp:literal meta:resourcekey="submit" runat="server" /></a>
                                <a class=" btn btn-block btn-link"><asp:literal meta:resourcekey="continueShopping" runat="server" /></a>
                            </fieldset>
                        </section>
                        <section>
                             <div
					        vc-recaptcha
					        theme="'light'"
					        key="checkoutCtrl.captchaKey"
                            stoken="checkoutCtrl.captchaStoken"
                            ng-model="checkoutCtrl.recaptcha"
                            class="g-recaptcha"
                            style="transform:scale(0.77);-webkit-transform:scale(0.77);transform-origin:0 0;-webkit-transform-origin:0 0;"
					        ></div>
                        </section>
                        <section>
                            <fieldset>
                                <div class="row">
                                    <div class="col-md-12 col-xs-12">
                                        <label>
                                            <input type="checkbox" ng-model="checkoutCtrl.emailPermission" checked />
                                            <span id="emailPermission"><asp:literal meta:resourcekey="emailPermission" runat="server" /></span>
                                        </label>
                                    </div>
                                    <div class="col-md-12 col-xs-12">
                                        <label>
                                            <input type="checkbox" ng-model="checkoutCtrl.mailPermission" checked />
                                            <span id="mailPermission"><asp:literal meta:resourcekey="mailPermission" runat="server"/></span>
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </section>
                    </form>
                </asp:Panel>
</asp:Panel>
<script>
    $('#checkoutForm').attr('name', 'checkoutForm'); //this is horrible but I can't figure anything else out
</script>