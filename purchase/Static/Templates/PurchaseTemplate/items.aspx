<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="items.aspx.cs" Inherits="PurchaseTemplate.Static.Templates.PurchaseTemplate.items" %>

<section class="main-contents container-fluid viewport-height">
    <div class="cross-sell-item cross-sell-item cart-home">
        <a ui-sref="checkout" class=" purchase-image purchase-image-more">
            <span>
                <i class="zmdi zmdi-shopping-cart"></i>
            </span>
            <small>cart
            </small>
        </a>
    </div>
	<h1 class="text-center"><asp:literal meta:resourcekey="purchaseItemsHeading" runat="server" /></h1>
	<h2 class="main-subheading text-center"><asp:literal meta:resourcekey="purchaseItemsSubheading" runat="server"/></h2>

    <!-- Products thumbnail grid -->
    <!-- End single purchase item -->
    <div class="row text-center" vertilize-container>
        <div class="col-lg-2 col-sm-4  col-xs-12 purchase-item-column" ng-repeat="item in items | unique: 'title' | orderBy: '+displayOrder'">
            <div class="purchase-item " ng-if="item.enabled == 'y'" vertilize>
                <div class="thumbnail">
                    <a class="purchase-image" ui-sref="productDetails({id:item.purchaseItemID})" ng-style="{'background-image': 'url(' + item.imageUrl + ')'}">
                        <div ng-if="item.availableQuantity == 0">
                            <div class="corner-ribbon top-right "><asp:literal meta:resourcekey="purchaseItemsSoldOut" runat="server" /></div>
                        </div>

                        <%-- NOTE: Currency display formatting is handled on back end to match gateway set in admin and language selected --%>
                        <span class="purchase-item-price">{{item.price}}</span>
                    </a>
                    <div class="caption">
                        <p class="purchase-item-title">
                            <a ui-sref="productDetails({id:item.purchaseItemID})">{{item.title}}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

	    <p ng-if="items.length === 0" class="no-items-available"><asp:literal meta:resourcekey="noItems" runat="server"/></p>
    </div>

</section>
