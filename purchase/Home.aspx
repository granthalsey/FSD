<%@ Page Language="C#" CodeBehind="Home.aspx.cs" AutoEventWireup="True" Inherits="PurchaseTemplate.Home" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Customize Me</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Custom Google web font -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-1.12.4.js"
        integrity="sha256-Qw82+bXyGq6MydymqBxNPYTaUXXq7c8v3CwiYwLLNXU="
        crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.0-rc.1/angular-ui-router.js"></script>
    <!-- AngularUI unique filter -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.16/angular-filter.min.js"></script>
    <link rel="stylesheet" href="https://securedev2012a.artezhq.com/regV2/EventStyleSheet.ashx?EventID=<%= EventId %>" />
    <!-- Ui Bootstrap -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.6.1/angular-sanitize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-animate.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.js"></script>
    <!-- Block UI -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-block-ui/0.2.2/angular-block-ui.min.js"></script>
    <!-- Angular ReCaptcha-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-recaptcha/4.1.0/angular-recaptcha.min.js"></script>
    
</head>
    <input type="hidden"  ng-init="url='<%= ImageWriterUrl %>'" ng-model="url" value='<%= ImageWriterUrl %>' />
	<input type="hidden" value='<%= WebGetServiceUrl %>'/>
	<script type="text/javascript">
		serverSettings = {
			webGetServiceUrl: '<%= WebGetServiceUrl %>',
			imageWriterUrl: '<%= ImageWriterUrl %>',
			language: '<%= Language %>',
			eventId: <%= EventId %>
		};
	</script>
<body ng-app="PurchaseTemplate">
    <div class="wrap fs-bs" ng-controller="BaseController" autoscroll>
        <!-- Static header with shopping cart goes here -->
        <!-- CTA banner goes here -->
        <div class="hero" style="height: {{banner.height}}px !important"></div>
        <!-- Main content -->
        <ui-view class="viewport-height"></ui-view>

    </div>

    <div class="footer">
        <div class="container text-muted text-center">
            <a href>
                <asp:Literal meta:resourcekey="termsOfService" runat="server" /></a>
            <span id="languageToggle" runat="server">|
                <asp:Literal meta:resourcekey="language" runat="server" />:
                <button id="french" class="btn btn-default">
                    <asp:Literal meta:resourcekey="languageText" runat="server" />
                    <i class="zmdi zmdi-caret-down"></i>
                </button>
            </span>
        </div>

        <div>Client footer goes here</div>
    </div>

	<%-- sample code to switch to French. --%>
	<script type="text/javascript">
		$("#french").click(function () {
			var englishUrl = window.location.pathname + "?lp=en-CA&eid=" + serverSettings.eventId + window.location.hash;
			var frenchUrl = window.location.pathname + "?lp=fr-CA&eid=" + serverSettings.eventId + window.location.hash;

			window.location.replace(frenchUrl);

			if (window.location.href.indexOf(frenchUrl) > 0) {
				window.location.replace(englishUrl);
		    }
		});
	</script>

    <asp:PlaceHolder runat="server">
        <%: Scripts.Render("~/bundles/app") %>
    </asp:PlaceHolder>
</body>
</html>
