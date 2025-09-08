import React from 'react';

export type NavLink = {
    label: string;
    href: string;
};

export const navLinks: NavLink[] = [
    { label: 'Favorites', href: '/favorites' },
    { label: 'Solutions', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Pricing', href: '#' },
];

interface NavLinksProps {
    className?: string;
    itemClassName?: string;
    onClickLink?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ className = '', itemClassName = '', onClickLink }) => (
    <div className={className}>
        {navLinks.map((link) => (
            <a
                key={link.label}
                href={link.href}
                title={link.label}
                className={itemClassName}
                onClick={onClickLink}
            >
                {link.label}
            </a>
        ))}
    </div>
);

export default NavLinks;