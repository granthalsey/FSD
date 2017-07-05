<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="PurchaseTemplate.Static.Templates.home" %>

<section class="container">
    <div class="row">
        <div class="col-xs-12">
            <div class="wrap-shadow view-height">
                <h1 class="text-center">
                    <asp:literal id="heading" meta:resourcekey="heading" runat="server" />
                </h1>
                <!-- Main logo -->
                <!-- -->
                <!-- -->
                <!-- CTA buttons -->
                <div class="cta-buttons-container text-center col-xs-12">
                    <a class="btn btn-primary btn-lg" ui-sref="items">
                        <asp:literal runat="server" meta:resourcekey="purchaseButton" />
                    </a>
                </div>

                <asp:literal id="description" meta:resourcekey="description" runat="server" />

                <!-- -->
                <!-- -->
            </div>
        </div>
    </div>
</section>
