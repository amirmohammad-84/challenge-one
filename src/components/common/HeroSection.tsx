type HeroSectionProps = {
  title: string;
  description: React.ReactNode;
  titleColor?: string;
  descriptionColor?: string;
  marginTop?: string;
  marginBottom?: string;
  maxWidth?: string;
};

export default function HeroSection({
  title,
  description,
  titleColor = '#00BA9F',
  descriptionColor = '#969696',
  marginTop = '3rem',
  marginBottom = '1.5rem',
  maxWidth = '40rem',
}: HeroSectionProps) {
  return (
    <div
      className="text-center mx-auto"
      style={{ marginTop, marginBottom, maxWidth }}
    >
      <h1
        className="text-3xl font-extrabold font-yekan"
        style={{ color: titleColor }}
      >
        {title}
      </h1>
      <p
        className="text-lg font-normal mt-2"
        style={{ color: descriptionColor }}
      >
        {description}
      </p>
    </div>
  );
}
