using System;
using System.Web;
using System.Web.Optimization;

namespace PurchaseTemplate
{
    public class Global : HttpApplication
    {
        protected void Application_Start()
        { BundleConfig.RegisterBundles(BundleTable.Bundles); }

    }

}


