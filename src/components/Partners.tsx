export function Partners() {
  return (
    <section className="my-16 text-center">
      <h3 className="text-xl font-bold text-white mb-8">Официальные партнёры</h3>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
        {['Федерация дзюдо', 'Федерация кэмпо', 'Минспорт РФ', 'Федерация самбо'].map((name) => (
          <div key={name} className="text-sm text-gray-400 font-medium">
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
