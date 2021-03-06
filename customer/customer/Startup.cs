using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using customer.Helpers;
using Microsoft.AspNetCore.Http;

namespace customer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromDays(30);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                #region Home

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=ViewAbout}");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=ViewContact}");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=ViewCart}");

                #endregion

                #region Auth

                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=SignIn}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=SignUp}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=ForgetPassword}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=SignOut}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=ViewInformation}/{UserId?}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=Update}/{UserId?}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=ChangePassword}/{UserId?}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=CheckPassword}/{UserId?}");
                endpoints.MapControllerRoute(
                    name: "auth",
                    pattern: "{controller=Auth}/{action=ResetPassword}");

                #endregion

                #region Cart

                #endregion

                #region Comment

                endpoints.MapControllerRoute(
                    name: "comment",
                    pattern: "{controller=Comment}/{action=RetrieveComment}");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Comment}/{action=CreateComment}");

                #endregion

                #region Product

                endpoints.MapControllerRoute(
                    name: "product",
                    pattern: "{controller=Product}");
                endpoints.MapControllerRoute(
                    name: "product",
                    pattern: "{controller=Product}/{action=View}/{ProductId?}");

                #endregion
                
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=CheckOut}");
            });
        }
    }
}
