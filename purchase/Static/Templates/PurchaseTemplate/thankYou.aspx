<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="thankYou.aspx.cs" Inherits="PurchaseTemplate.Static.Templates.PurchaseTemplate.thankYou" %>

<section class="container">
    <div class="row">
        <div class="col-xs-12">
            <div class="wrap-shadow view-height">
                <h1 class="text-center">
                    <asp:literal id="heading" meta:resourcekey="heading" runat="server" />
                </h1>

                <asp:literal id="confirmationMsg" meta:resourcekey="confirmationMsg" runat="server" />
                
                <a ui-sref="items">
                   <asp:literal runat="server" meta:resourcekey="returnToProducts" />
                </a>

                <!-- TODO: Include AddThis widget -->

                <!-- -->
                <!-- -->
            </div>
        </div>
    </div>
</section>