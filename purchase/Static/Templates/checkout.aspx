<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="checkout.aspx.cs" Inherits="PurchaseTemplate.Static.Templates.checkout" %>

<div class="container view-height">
    <div>
        <div class="row">
            <div class="col-lg-5 col-md-6 col-sm-12  col-xs-12 pull-right">
                <div class="purchase-items-checkout">
                    <h2>
                        <asp:literal meta:resourcekey="orderSummaryHeading" runat="server" />
                    </h2>
                    <div class="row">
                        <br />
                    </div>
                    <div class="row">
                        <div class="col-md-2 col-xs-3">
                            <div class="checkout-image" style="background-image: url('https://placeimg.com/201/180/any');"></div>

                        </div>
                        <div class="col-md-7 col-xs-6">
                            <span class="cart-title">Bed Frames and Mattresses</span><br />
                            Price: $150.00<br />
                            Size: Medium<br />
                            Quantity: 2<br />
                            <a href class="cart-link">edit</a> | <a href class="cart-link">remove</a>

                        </div>
                        <div class="col-md-3 col-xs-3 text-right">
                            <span class="cart-subtotal">$300.00</span>
                        </div>
                        <hr class="col-xs-12" />
                    </div>

                    <div class="row">
                        <div class="col-md-2 col-xs-3">
                            <div class="checkout-image" style="background-image: url('https://placeimg.com/200/180/any');"></div>

                        </div>
                        <div class="col-md-7 col-xs-6">
                            <span class="cart-title">A Different Item</span><br />
                            Price: $100.00<br />
                            Size: Medium<br />
                            Quantity: 3<br />
                            <a href class="cart-link">edit</a> | <a href class="cart-link">remove</a>

                        </div>
                        <div class="col-xs-3 text-right">
                            <span class="cart-subtotal">$210.00</span>
                        </div>
                        <hr class="col-xs-12" />
                    </div>

                    <div class="row">
                        <div class="col-md-2 col-xs-3">
                            <div class="icon-backer checkout-image" style="background-image: url('/static/images/gift.png')">
                                <span class="sr-only">Donation</span>
                            </div>
                        </div>
                        <div class="col-md-7 col-xs-6">

                            <span class="cart-title">Donation</span><br />


                            <a href class="cart-link">edit</a> | <a href class="cart-link">remove</a>

                        </div>
                        <div class="col-xs-3 text-right">
                            <span class="cart-subtotal">$100.00</span>
                        </div>
                        <hr class="col-xs-12" />
                    </div>


                    <div class="row">
                        <%--if we have a donation and if the donor covered the fees--%>
                        <div class="col-xs-9">
                            Donation Fee
                        </div>
                        <div class=" col-xs-3 text-right">
                            $8.75
                        </div>
                        <%--/if--%>
                        <div class="col-xs-9">
                            <asp:literal meta:resourcekey="shippingLine" runat="server" />
                        </div>
                        <div class=" col-xs-3 text-right">
                            $10.00
                        </div>
                        <div class="col-xs-9">
                            <asp:literal meta:resourcekey="taxLine" runat="server" />
                        </div>
                        <div class=" col-xs-3 text-right">
                            $31.00
                        </div>
                    </div>
                    <div class="row">
                        <div class="">
                            <div class="col-xs-9 cart-total">
                                <asp:literal meta:resourcekey="totalLine" runat="server" />
                            </div>
                            <div class=" col-xs-3 text-right cart-total">
                                $651.00
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-7 col-md-6 col-sm-12 col-xs-12 pull-left">
                <div class="purchase-items-checkout">
                    <form runat="server" clientidmode="Static" id="checkoutForm" novalidate accessibleform ng-submit="submitCheckout(checkoutInfo, $event);">
                        <section>
                            <h2>Shipping Information</h2>
                            <fieldset>

                                <div class="row form-group" show-errors>
                                    <div class="col-xs-12">
                                        <p ng-show="checkoutForm.firstName.$invalid && !checkoutForm.firstName.$pristine" class="help-block"><%= rfvFirstName.ErrorMessage %></p>

                                    </div>
                                    <div class="col-xs-6">
                                        <asp:requiredfieldvalidator id="rfvFirstName" controltovalidate="firstName" meta:resourcekey="rfvFirstName" name="rfvFirstName"
                                            display="None" enableclientscript="False" runat="server" />
                                        <asp:textbox id="firstName" cssclass="form-control"
                                            meta:resourcekey="firstName" autofocus ng-model="checkoutInfo.firstName" runat="server" ng-required="true" />
                                        <!--validator enabled: <%= rfvFirstName.Enabled %> we'll need to this to toggle the column classes once we know what fields can be hidden and show. -->
                                        <!--field enabled: <%= firstName.Enabled %> -->
                                    </div>
                                    <div class="col-xs-6">
                                        <asp:textbox id="lastName" cssclass="form-control" meta:resourcekey="LastName" runat="server" />
										<span style="display: none"><%= lastName.Visible %></span>
                                    </div>
                                </div>


                                <input class="form-control " placeholder="Street Address" />
                                <div class="row">
                                    <div class="col-xs-6">
                                        <input class="form-control" placeholder="City" />
                                    </div>
                                    <div class="col-xs-3">
                                        <input class="form-control" placeholder="State" />
                                    </div>
                                    <div class="col-xs-3">
                                        <input class="form-control" placeholder="Zip" />
                                    </div>
                                </div>
                            </fieldset>
                        </section>
                        <!-- Survey questions -->
                        <section ng-show="surveyQuestions && surveyQuestions.length > 0">
                            <h2>Additional Information</h2>

                            <div class="survey-questions form-group">
                                <div ng-if="surveyQuestion.QuestionTypeID !== 'GiftAid'" ng-repeat="surveyQuestion in surveyQuestions track by $index" class="form-group">
                                    <%-- Inject appropriate markup based on typeName attribute for each survey question --%>
                                    
                                    <%-- Dropdown menus --%>
                                    <label ng-if="surveyQuestion.typeName == 'Drop Down' && surveyQuestion.visible == 'y'" for="{{surveyQuestion.ExternalQuestionID}}">{{surveyQuestion.questionText}}</label>
                                    <select ng-if="surveyQuestion.typeName == 'Drop Down' && surveyQuestion.visible == 'y'" ng-required="{{surveyQuestion.IsMandatory}}" name="{{surveyQuestion.ExternalQuestionID}}" id="{{surveyQuestion.ExternalQuestionID}}" class="form-control">
                                        <option ng-repeat="answer in surveyQuestion.availableAnswers track by $index" value="{{surveyQuestion.availableAnswers[$index]}}">{{surveyQuestion.availableAnswers[$index]}}</option>
                                    </select>

                                    <%-- Single line text input --%>
                                    <input ng-if="surveyQuestion.typeName == 'Text Line' && surveyQuestion.visible == 'y'" type="text" id="{{surveyQuestion.ExternalQuestionID}}" ng-required="{{surveyQuestion.IsMandatory}}" class="form-control" />

                                    <%-- Multiline text input (AKA Textarea) --%>
                                    <textarea ng-if="surveyQuestion.typeName == 'Text Area' && surveyQuestion.visible == 'y'" ng-required="{{surveyQuestion.IsMandatory}}" class="form-control">
                                    </textarea>

                                    <%-- Checkboxes --%>
                                    <p ng-if="surveyQuestion.typeName == 'Check Box' && surveyQuestion.visible == 'y'">{{surveyQuestion.questionText}}</p>
                                    <div ng-if="surveyQuestion.typeName == 'Check Box' && surveyQuestion.visible == 'y'" ng-repeat="answer in surveyQuestion.availableAnswers track by $index" class="checkbox">
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
                                    
                                    <%-- Date Inputs (Can exist in multiple formats), UI library to be used? --%>

                                </div>
                            </div>
                        </section>

                        <section>
                            <h2>Billing Information</h2>
                            <fieldset>
                                <div class="row">
                                    <div class="col-md-2 sm-hidden xs-hidden"></div>
                                    <div class="col-md-8 col-sm-12 col-xs-12">
                                        <div class="btn-group btn-group-justified ">
                                            <div class="btn-group">
                                                <button class="btn btn-default " ng-class="'active'">
                                                    <i class="zmdi zmdi-card btn-icon-lg"></i>
                                                    <small>Pay With Credit Card
                                                    </small>
                                                </button>
                                            </div>
                                            <div class="btn-group">
                                                <button class="btn btn-default">
                                                    <i class="zmdi zmdi-paypal btn-icon-lg"></i>
                                                    <small>Pay With PayPal
                                                    </small>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2 sm-hidden xs-hidden"></div>
                                </div>

                                <div class="row">
                                    <div class="col-xs-12">
                                        <input placeholder="Name on Card" type="text" name="CardName" class="form-control" />
                                    </div>



                                </div>
                                <div class="row">
                                    <div class="col-md-7 col-xs-12">
                                        <input placeholder="Card number" type="text" name="CardNumber" class="form-control" />
                                    </div>
                                    <div class="col-md-3 col-xs-7">
                                        <input placeholder="MM / YYYY" type="text" name="CardExpiry" class="form-control" />
                                    </div>
                                    <div class="col-md-2 col-xs-5">
                                        <input placeholder="CVC" type="text" name="CardCvc" class="form-control" />
                                    </div>
                                </div>
                                <label>
                                    <input type="checkbox" checked />
                                    Use shipping as billing address
                                </label>

                                <input type="submit" class="btn btn-primary btn-block btn-lg" />
                                <a class="btn btn-block btn-link">Continue Shopping
                                </a>
                            </fieldset>
                        </section>
                    </form>
                </div>
            </div>

        </div>
    </div>

</div>
<script>
    $('#checkoutForm').attr('name', 'checkoutForm'); //this is horrible but I can't figure anything else out

</script>
