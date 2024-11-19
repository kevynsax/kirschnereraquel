import { Button } from "../components/Button.tsx";

const linkLocal = "https://maps.app.goo.gl/hAJVD5skFK7rP5t19";
const linkLembrete =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20241214T200000Z%2F20241215T024500Z&details=Casamento%20da%20Raquel%20e%20Kirschner&location=Villa%20Be&text=Casamento%20Kirschner%20e%20Raquel";

export default function LocalCard() {
    return (
        <div className="place">
            <div class="card-place">
                <div className="image-wrapper">
                    <img src="local.jpg" />
                </div>

                <div class="place-info">
                    <span class="title">Casamento</span>

                    <div className="wrap">
                        <div className="info">
                            <div className="icon">
                                <img src="/icon/date.svg" />
                            </div>
                            <span>14 de dezembro de 2024 - 16H30</span>
                        </div>

                        <div className="info">
                            <div className="icon">
                                <img src="/icon/place.svg" />
                            </div>
                            <span>
                                Villa Bé - Ponte Alta Gama, Brasília - DF
                            </span>
                        </div>
                    </div>

                    <div className="actions">
                        <Button
                            onClick={() => window.open(linkLocal, "_blank")}
                            prefixImage="/icon/place.svg"
                        >
                            Maps
                        </Button>
                        <Button
                            onClick={() => window.open(linkLembrete, "_blank")}
                            prefixImage="/icon/date.svg"
                        >
                            Add Lembrete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
