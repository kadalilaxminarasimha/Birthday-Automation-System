import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Card className="text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Birthday Automation System
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">
          Keep track of everyone's birthdays in one place. Add your friends
          and family, and let the system automatically prepare a birthday
          message on their special day.
        </p>
        <Link to="/add-member">
          <Button>Get Started</Button>
        </Link>
      </Card>
    </div>
  );
}
