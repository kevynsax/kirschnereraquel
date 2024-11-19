import { Logo } from './Logo.tsx';

export const AppBar = () => {
    return (
        <div className="app-bar">
            <Logo />

            <div className="menu">
                <span data-label='Gifts' onClick={() => window.location.href='#gifts'}>Lista de presentes</span>
                <span data-label='Mural' onClick={() => window.location.href='#mural'}>Mural de recados</span>
                <span data-label='Local' onClick={() => window.location.href="#local"}>Casamento</span>
            </div>
        </div>
    );
}
