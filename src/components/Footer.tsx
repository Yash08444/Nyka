import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-luxury-stone/10 pt-16 pb-12">
            <div className="container mx-auto px-6 flex flex-col items-center">
                {/* Brand Section */}
                <div className="text-center space-y-4 mb-12">
                    <h3 className="text-xl tracking-[0.3em] font-brand font-bold uppercase text-foreground">
                        NYKAA<span className="text-primary">FASHION</span>
                    </h3>
                    <p className="text-xs text-luxury-stone leading-relaxed font-light italic max-w-xs mx-auto">
                        Elevating your wardrobe with curated luxury and timeless elegance. Experience the finest in fashion and beauty.
                    </p>
                    <div className="flex justify-center space-x-6 pt-2">
                        <Instagram size={18} className="text-luxury-stone hover:text-primary cursor-pointer transition-colors" />
                        <Facebook size={18} className="text-luxury-stone hover:text-primary cursor-pointer transition-colors" />
                        <Twitter size={18} className="text-luxury-stone hover:text-primary cursor-pointer transition-colors" />
                        <Mail size={18} className="text-luxury-stone hover:text-primary cursor-pointer transition-colors" />
                    </div>
                </div>

                {/* Navigation Groups */}
                <div className="w-full space-y-12 mb-16">
                    <div className="text-center">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] mb-6 font-bold text-foreground">Collections</h4>
                        <ul className="space-y-4">
                            {["New Season", "Designer Edits", "Bridal Wear", "Accessories", "Beauty Exclusive"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-xs text-luxury-stone hover:text-primary transition-colors font-medium uppercase tracking-wider">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] mb-6 font-bold text-foreground">Customer Service</h4>
                        <ul className="space-y-4">
                            {["Contact Us", "Shipping & Returns", "Size Guide", "Care Instructions", "Gift Cards"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-xs text-luxury-stone hover:text-primary transition-colors font-medium uppercase tracking-wider">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center max-w-xs mx-auto">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4 font-bold text-foreground">Newsletter</h4>
                        <p className="text-[10px] text-luxury-stone mb-6 font-medium uppercase tracking-widest leading-relaxed">Join our list for exclusive previews and editorial insights.</p>
                        <form className="relative" suppressHydrationWarning>
                            <input
                                id="footer-newsletter-email"
                                name="email"
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-primary/20 py-3 text-[10px] text-center tracking-[0.2em] focus:border-primary outline-none transition-colors pr-8 placeholder:text-luxury-stone/50 font-bold"
                                suppressHydrationWarning
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-foreground transition-colors"
                            >
                                <Mail size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Legal & Copyright */}
                <div className="w-full pt-10 border-t border-luxury-stone/5 text-center">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-luxury-stone mb-6 font-bold">
                        © 2026 NYKAA FASHION. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex justify-center space-x-6">
                        {["Privacy", "Terms", "Accessibility"].map((item) => (
                            <Link key={item} href="#" className="text-[9px] uppercase tracking-[0.3em] text-luxury-stone hover:text-primary transition-colors font-bold">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
