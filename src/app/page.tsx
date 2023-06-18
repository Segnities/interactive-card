import CardForm from "./components/CardForm";
import LinearGradientBlock from "./components/UI/LinearGradientBlock";

import './styles/InteractiveCard.scss';

export default function InterectiveCard() {
  return (
    <main>
      <div className="grid-container">
        <LinearGradientBlock />
        <CardForm />
      </div>
    </main>
  )
}
