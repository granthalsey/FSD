<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="cartReview.aspx.cs" Inherits="PurchaseTemplate.Static.Templates.PurchaseTemplate.cartReview" %>

<div class="col-lg-5 col-md-6 col-sm-12  col-xs-12 pull-right">
    <div class="purchase-items-checkout" ng-show="cartCtrl.cartItems.length == 0">
        <h2>
            <asp:literal meta:resourcekey="cartEmptyHeading" runat="server" />
        </h2>
        <a class=" btn btn-block btn-link">
            <asp:literal meta:resourcekey="continueShopping" runat="server" />
        </a>
    </div>
    <div class="purchase-items-checkout" ng-show="cartCtrl.cartItems.length != 0">
        <h2>
            <asp:literal meta:resourcekey="orderSummaryHeading" runat="server" />
        </h2>
        <div class="row" ng-repeat="item in cartCtrl.cartItems">
            <div class="col-md-2 col-xs-12">
                <img class="img-responsive" ng-src="{{item.url}}" />
            </div>
            <div class="col-md-7 col-xs-9">
                <span class="cart-title">{{item.title}}</span><br />
                <span>
                     <asp:literal meta:resourcekey="priceLabel" runat="server" />
                </span>
                <span>: {{item.price | currency}}<br /></span>
                <span ng-show="item.ParentPurchaseItemID != 0">{{cartCtrl.PurchaseItemsService.getPurchaseItem(item.ParentPurchaseItemID).ItemAttributeType}}: {{item.ItemAttribute}}<br /></span>
                <span ng-show="!item.isEditing"><asp:literal meta:resourcekey="quantityLabel" runat="server" />: {{item.quantity}}<br /></span>
                <div class="form-inline" ng-show="item.isEditing">
                    <span ng-show="item.isEditing">
                        <asp:literal meta:resourcekey="quantityLabel" runat="server" />:
                    </span>
                    <input min="1" max="{{item.availableQuantity}}" type="number" id="Quantity{{$index}}" name="Quantity{{$index}}" class="form-control input-sm" value="{{item.quantity}}"  ng-change="cartCtrl.changeQuantity($index)" ng-model="item.quantity"/>
                </div>
                <a href class="cart-link text-muted" ng-show="item.isEditing" ng-click="item.isEditing= false"><asp:literal meta:resourcekey="doneLabel" runat="server" /></a>
                <a href class="cart-link text-muted" ng-click="item.isEditing= true" ng-show="!item.isEditing"><asp:literal meta:resourcekey="editLabel" runat="server" /></a> | <a href class="cart-link text-muted" ng-click="cartCtrl.deleteItem($index)"><asp:literal meta:resourcekey="removeLabel" runat="server" /></a>
            </div>
            <div class="col-md-3 col-xs-3 text-right">
                <span class="cart-subtotal">{{item.quantity * item.price | currency}}</span>
            </div>
            <hr  />
        </div>
        <!--<div class="row">
            <div class="col-xs-9">
               <asp:literal meta:resourcekey="shippingLabel" runat="server" />
            </div>
            <div class=" col-xs-3 text-right">
                $10.00
            </div>
            <div class="col-xs-9">
                <asp:literal meta:resourcekey="taxLabel" runat="server" />
            </div>
            <div class=" col-xs-3 text-right">
                $31.00
            </div>
        </div>-->
        <div class="row">
            <div class="">
                <div class="col-xs-9 cart-total">
                    <asp:literal meta:resourcekey="totalLabel" runat="server" />
                </div>
                <div class=" col-xs-3 text-right cart-total">
                    {{ cartCtrl.CheckoutValidationService.getTotal(cartCtrl.cartItems) | currency }}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">

            </div>
        </div>
    </div>
</div>
