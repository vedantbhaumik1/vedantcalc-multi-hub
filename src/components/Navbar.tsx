import React from 'react';
import { Calculator, Menu } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
const Navbar: React.FC = () => {
  return <nav className="bg-calculator-primary shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-white" />
            <span className="text-white font-bold text-xl">VedantCalc</span>
          </div>
          
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                    Basic Calculators
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="#standard" title="Standard Calculator">
                        Basic arithmetic operations for everyday use
                      </ListItem>
                      <ListItem href="#scientific" title="Scientific Calculator">
                        Advanced functions for technical calculations
                      </ListItem>
                      <ListItem href="#percentage" title="Percentage Calculator">
                        Calculate percentages, discounts, and markups
                      </ListItem>
                      <ListItem href="#vedic" title="Vedic Mathematics">
                        Fast calculation methods based on Vedic techniques
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                    Converters
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="#converter" title="Unit Converter">
                        Convert between different units of measurement
                      </ListItem>
                      <ListItem href="#currency" title="Currency Converter">
                        Convert between world currencies with live rates
                      </ListItem>
                      <ListItem href="#date" title="Date Calculator">
                        Calculate date differences and future/past dates
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
                    Finance & Health
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href="#finance" title="Finance Calculator">
                        Investment, loan, and ROI calculations
                      </ListItem>
                      <ListItem href="#mortgage" title="Mortgage Calculator">
                        Estimate mortgage payments and analyze loan details
                      </ListItem>
                      <ListItem href="#loan" title="Loan EMI Calculator">
                        Calculate equated monthly installments for loans
                      </ListItem>
                      <ListItem href="#tip" title="Tip Calculator">
                        Calculate tips and split bills among groups
                      </ListItem>
                      <ListItem href="#bmi" title="BMI Calculator">
                        Calculate Body Mass Index for health assessment
                      </ListItem>
                      <ListItem href="#exercise" title="Exercise Calculator">
                        Calories burned, one-rep max, and body fat calculations
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </nav>;
};
const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & {
  title: string;
}>(({
  className,
  title,
  children,
  ...props
}, ref) => {
  return <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>;
});
ListItem.displayName = "ListItem";
export default Navbar;