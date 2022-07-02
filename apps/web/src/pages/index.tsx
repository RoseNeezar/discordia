import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <h1 className="bg-red-400">Discord app</h1>
      <a
        href={`https://api.whatsapp.com/send?phone=+60104016848&text=${
          "Hello ! here is text ! click " + "https://tinyurl.com/36kedumb"
        }`}
      >
        Click
      </a>
      <Button />
    </div>
  );
}
