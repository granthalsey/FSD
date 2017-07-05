<%@ Page Language="C#" AutoEventWireup="true" CodeFile="productDetails.aspx.cs" Inherits="PurchaseTemplate.Static.Templates.PurchaseTemplate.productDetails" culture="auto" meta:resourcekey="PageResource1" uiculture="auto" %>

    <!--  -->
    <!--  -->
    <div class="container ">
        <div class="cross-sell text-right">
            <div  ng-repeat="img in [] | range:3  track by $index" class="cross-sell-item" ng-show="detailsCtrl.items[$index] != undefined"> 
                <a ui-sref="productDetails({id: detailsCtrl.items[$index].purchaseItemID})" class=" purchase-image">
                    <img ng-src="{{detailsCtrl.items[$index].url}}" alt="..." width="60px" height="60px">
                </a>
            </div>
            <div class="cross-sell-item" ng-show="detailsCtrl.moreSize != 0">
                <a ui-sref="items" class=" purchase-image purchase-image-more">
                    <span>+{{detailsCtrl.moreSize}}</span>
                    <small Runat="server" meta:resourcekey="moreLabel" ></small>
                </a>
            </div>
            <div class="cross-sell-item cross-sell-item">
                <a ui-sref="checkout" class=" purchase-image purchase-image-more">
                    <span>
                       <i class="glyphicon glyphicon-shopping-cart"></i>{{detailsCtrl.PurchaseCartService.getCartSize()}}
                    </span>
                    <small Runat="server" meta:resourcekey="cartLabel"></small>
                </a>
            </div>
        </div>
        <div class="chosen-purchase-item">
            <div class="row">
                    <div class=" col-xs-12 col-md-7 " >
                        <div class="image-gallery">
                            <div uib-carousel active="detailsCtrl.active" interval="0">
                                 <div uib-slide ng-repeat="slide in detailsCtrl.product.slides track by $index" index="$index">
                                     <div class="corner-ribbon top-left" ng-show="detailsCtrl.realProduct.available == 0" Runat="server" meta:resourcekey="watermark"></div>
                                     <a class="chosen-purchase-item-image"
                                    style="background-image: url({{slide}})"></a>
                                 </div>
                             </div>
                             <div class="image-gallery-navigation">
                                <a class="image-gallery-thumbnail " ng-class="detailsCtrl.active == $index ? 'active': ''"
                                    ng-repeat="slide in detailsCtrl.product.slides track by $index"
                                    ng-click="detailsCtrl.active = $index;"
                                   style="background-image: url({{slide}})"></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-md-5" >
                        <div>
                            <p class="chosen-purchase-item-title chosen-purchase-item-info">{{detailsCtrl.product.title}}</p>
                            <p class="chosen-purchase-item-price chosen-purchase-item-info">{{detailsCtrl.product.price}}</p>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="chosen-purchase-item-qty" Runat="server" meta:resourcekey="quantityLabel"></label>
                                        <select name="chosen-purchase-item-qty"
                                            class="form-control" ng-model="detailsCtrl.purchaseInformation.quantity"
                                            ng-disabled="(detailsCtrl.product.childs != undefined && detailsCtrl.purchaseInformation.attribute == '0') || (detailsCtrl.realProduct.available <= 0)">
                                              <option ng-repeat="n in [] | range:detailsCtrl.realProduct.maxPurchaseAllowed" value="{{$index+1}}" >{{$index + 1}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6" ng-show="detailsCtrl.product.childs != undefined">
                                    <div class="form-group" ng-class="{true: 'has-error'}[detailsCtrl.submitted && detailsCtrl.purchaseInformation.attribute == '0']">
                                        <label for="chosen-purchase-item-attr">{{detailsCtrl.product.ItemAttributeType}}</label>
                                        <span class="glyphicon glyphicon-exclamation-sign form-control-feedback" ng-show="detailsCtrl.submitted && detailsCtrl.purchaseInformation.attribute == '0'"></span>
                                        <select id="chosen-purchase-item-attr" name="chosen-purchase-item-attr"
                                            class="form-control" ng-model="detailsCtrl.purchaseInformation.attribute" ng-change="detailsCtrl.changeRealProduct(detailsCtrl.purchaseInformation.attribute)">
                                            <option value="0" selected>-select-</option>
                                            <option ng-repeat="x in detailsCtrl.product.childs" value="{{x.purchaseItemID}}" >{{x.ItemAttribute}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <a class="btn btn-primary btn-block"  ng-click="detailsCtrl.addToCart()" ng-disabled="detailsCtrl.realProduct.available <= 0" Runat="server" meta:resourcekey="addToCartLabel"></a>
                            <div ng-show="detailsCtrl.product.shortDescription != undefined">
                                <p class="chosen-purchase-item-desc chosen-purchase-item-info">
                                    {{detailsCtrl.product.shortDescription}}
                                </p>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <a ui-sref="items" class="btn btn-info pull-left" Runat="server" meta:resourcekey="continueShoppingLabel"></a>
                                    <a ui-sref="checkout" class="btn btn-info pull-right" Runat="server" meta:resourcekey="checkoutLabel"></a>
                                </div>
                            </div>
                            <div ng-show="detailsCtrl.realProduct.eCardStatus != 'Disabled'">
                                <form runat="server" clientidmode="Static" id="itemSubmit" novalidate accessibleform ng-submit="">
                                    <uib-accordion close-others="true">
                                        <div uib-accordion-group class="panel-default" heading="{{detailsCtrl.product.eCardTitle}} {{$index + 1}}" ng-repeat="card in [] | range:detailsCtrl.purchaseInformation.quantity track by $index">
                                            <div class="form-group has-feedback" ng-class="{true: 'has-error'}[detailsCtrl.purchaseInformation.senderNameDirty[$index] && detailsCtrl.purchaseInformation.senderName[$index] == undefined]" show-errors>
                                                <label Runat="server" meta:resourcekey="senderNameError" ng-show="detailsCtrl.purchaseInformation.senderNameDirty[$index] && detailsCtrl.purchaseInformation.senderName[$index] == undefined" class="help-block"></label>
                                                <span class="glyphicon glyphicon-exclamation-sign form-control-feedback" ng-show="detailsCtrl.purchaseInformation.senderNameDirty[$index] && detailsCtrl.purchaseInformation.senderName[$index] == undefined"></span>
                                                <input class="form-control" Runat="server" meta:resourcekey="senderName" ng-model="detailsCtrl.purchaseInformation.senderName[$index]" ng-change="detailsCtrl.purchaseInformation.senderNameDirty[$index] = true" name="senderName" type="text" ng-required="true" >
                                            </div>
                                            <div class="form-group has-feedback" ng-class="{true: 'has-error'}[(detailsCtrl.purchaseInformation.senderEmailDirty[$index] && detailsCtrl.purchaseInformation.senderEmail[$index] == undefined) || (detailsCtrl.purchaseInformation.senderEmail[$index] != undefined && !detailsCtrl.ProductDetailsValidationService.validateEmail(detailsCtrl.purchaseInformation.senderEmail[$index]))]">
                                                <label id="P1" Runat="server" meta:resourcekey="senderEmailError" ng-show="detailsCtrl.purchaseInformation.senderEmailDirty[$index] && detailsCtrl.purchaseInformation.senderEmail[$index] == undefined" class="help-block"></label>
                                                <label id="Label1" Runat="server" meta:resourcekey="invalidMail" ng-show="detailsCtrl.purchaseInformation.senderEmail[$index] != undefined && !detailsCtrl.ProductDetailsValidationService.validateEmail(detailsCtrl.purchaseInformation.senderEmail[$index])" class="help-block"></label>
                                                <input class="form-control" Runat="server" meta:resourcekey="senderEmail" ng-model="detailsCtrl.purchaseInformation.senderEmail[$index]" ng-change="detailsCtrl.purchaseInformation.senderEmailDirty[$index] = true" name="senderEmail"  type="text"  ng-required="true" >
                                                <span class="glyphicon glyphicon-exclamation-sign form-control-feedback" ng-show="(detailsCtrl.purchaseInformation.senderEmailDirty[$index] && detailsCtrl.purchaseInformation.senderEmail[$index] == undefined) || (detailsCtrl.purchaseInformation.senderEmail[$index] != undefined && !detailsCtrl.ProductDetailsValidationService.validateEmail(detailsCtrl.purchaseInformation.senderEmail[$index]))"></span>
                                            </div>
                                            <div class="form-group has-feedback" ng-class="{true: 'has-error'}[detailsCtrl.purchaseInformation.recipientNameDirty[$index] && detailsCtrl.purchaseInformation.recipientName[$index] === undefined]" >
                                                <label id="P2" Runat="server" meta:resourcekey="recipientNameError" ng-show="detailsCtrl.purchaseInformation.recipientNameDirty[$index] && detailsCtrl.purchaseInformation.recipientName[$index] == undefined" class="help-block"></label>
                                                <input class="form-control" Runat="server" meta:resourcekey="recipientName" ng-model="detailsCtrl.purchaseInformation.recipientName[$index]" ng-change="detailsCtrl.purchaseInformation.recipientNameDirty[$index] = true" name="recipientName"  type="text"  ng-required="true" >
                                                <span class="glyphicon glyphicon-exclamation-sign form-control-feedback" ng-show="detailsCtrl.purchaseInformation.recipientNameDirty[$index] && detailsCtrl.purchaseInformation.recipientName[$index] === undefined"></span>
                                            </div>
                                            <div class="form-group has-feedback" ng-class="{true: 'has-error'}[(detailsCtrl.purchaseInformation.recipientEmailDirty[$index] && detailsCtrl.purchaseInformation.recipientEmail[$index] == undefined) || (detailsCtrl.purchaseInformation.recipientEmail[$index] != undefined && !detailsCtrl.ProductDetailsValidationService.validateEmail(detailsCtrl.purchaseInformation.recipientEmail[$index]))]" >
                                                <label id="P3" Runat="server" meta:resourcekey="recipientEmailError" ng-show="detailsCtrl.purchaseInformation.recipientEmailDirty[$index] && detailsCtrl.purchaseInformation.recipientEmail[$index] == undefined" class="help-block"></label>
                                                <label id="Label2" Runat="server" meta:resourcekey="invalidMail" ng-show="detailsCtrl.purchaseInformation.recipientEmail[$index] != undefined && !detailsCtrl.ProductDetailsValidationService.validateEmail(detailsCtrl.purchaseInformation.recipientEmail[$index])" class="help-block"></label>
                                                <input class="form-control" Runat="server" meta:resourcekey="recipientEmail" ng-model="detailsCtrl.purchaseInformation.recipientEmail[$index]" ng-change="detailsCtrl.purchaseInformation.recipientEmailDirty[$index] = true" name="recipientEmail" type="text" ng-required="true" >
                                                <span class="glyphicon glyphicon-exclamation-sign form-control-feedback" ng-show="(detailsCtrl.purchaseInformation.recipientEmailDirty[$index] && detailsCtrl.purchaseInformation.recipientEmail[$index] == undefined) || (detailsCtrl.purchaseInformation.recipientEmail[$index] != undefined && !detailsCtrl.ProductDetailsValidationService.validateEmail(detailsCtrl.purchaseInformation.recipientEmail[$index]))"></span>
                                            </div>
                                            <div class="form-group has-feedback">
                                                <textarea class="form-control" rows="5" id="comment" ng-model="detailsCtrl.purchaseInformation.cardMessage[$index]">{{detailsCtrl.purchaseInformation.cardMessage}}</textarea>
                                            </div>
                                            <div class="form-group has-feedback">
                                                <div>
                                                    <label>
                                                        <input type="checkbox" ng-model="detailsCtrl.purchaseInformation.sendFuture[$index]" /> <label Runat="server" meta:resourcekey="sendEcardDateLabel"></label>
                                                    </label>
                                                </div>
                                                <div class="input-group" ng-if="detailsCtrl.purchaseInformation.sendFuture[$index]" ng-checked="detailsCtrl.openCalendar()">
                                                    <input type="text" class="form-control" uib-datepicker-popup="{{detailsCtrl.format}}" ng-model="detailsCtrl.purchaseInformation.futureDate[$index]" is-open="detailsCtrl.datePicker.opened" datepicker-options="detailsCtrl.dateOptions" ng-required="true" close-text="Close" alt-input-formats="detailsCtrl.altInputFormats" />
                                                    <span class="input-group-btn">
                                                        <button type="button" class="btn-default" ng-click="detailsCtrl.datePicker.opened = true;"><i class="glyphicon glyphicon-calendar"></i></button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </uib-accordion>
                                </div>
                           </form>
                        </div>
                    </div>
            </div>
        </div>
    </div>