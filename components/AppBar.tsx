import { Logo } from './Logo.tsx';

export const AppBar = () => {
    return (
        <div className="app-bar">
            <Logo />

            <div className="menu">
                <span data-label='Gifts'>Lista de presentes</span>
                <span data-label='Mural'>Mural de recados</span>
                <span data-label='Local'>Casamento</span>
            </div>
        </div>
    );
}
