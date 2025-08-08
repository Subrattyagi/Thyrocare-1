import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, Menu, X, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContactInfo } from "@/contexts/ContactContext";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useMenu } from "@/contexts/MenuContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAdmin } from "@/contexts/AdminContext";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { contactInfo } = useContactInfo();
  const { siteSettings } = useSiteSettings();
  const { menuItems } = useMenu();
  const { isLoggedIn } = useAdmin();

  return (
    <header className="bg-background border-b shadow-md">
      {/* Top contact bar */}
      <div className="bg-medical-blue text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Phone: {contactInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Hours: {contactInfo.businessHours}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">{contactInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 pt-0 pb-0">
        <div className="flex flex-col md:flex-row md:items-center min-h-[80px] h-full">
          <div className="flex items-center space-x-2">
            
              <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
            <h1 className="text-xl md:text-2xl font-bold text-medical-blue flex items-center">
              <span className="text-medical-red">T</span>hyrocare
            </h1>
          </div>

          {/* Desktop Menu and Auth Buttons */}
          <div className="hidden md:flex items-center justify-between w-full ml-10">
            <div className="flex items-center space-x-10">
              {menuItems.map((item) => (
                <Link 
                  key={item._id}
                  to={item.path} 
                  className="text-foreground hover:text-medical-blue transition-colors font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="medical-outline" size="sm" asChild>
                <Link to="/admin">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
              <Button variant="medical-outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="medical" size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <Link 
                  key={item._id}
                  to={item.path} 
                  className="text-foreground hover:text-medical-blue transition-colors py-2 px-4 border-b"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Theme toggle and auth buttons moved below menu items */}
              <div className="flex flex-col space-y-2 pt-4 px-4 mt-6">
                <div className="flex justify-center pb-2">
                  <ThemeToggle />
                </div>
                <Button variant="medical-outline" size="sm" className="w-full" asChild>
                  <Link to="/admin">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>
                <Button variant="medical-outline" size="sm" className="w-full" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="medical" size="sm" className="w-full" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
