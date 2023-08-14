export default function EmptyView({category}) {
  return (
    <div className="empty-view">
      <h3>No hay resultados</h3>
      {category && <p>No existen items en la categoría: <strong>{category}</strong></p>}
    </div>
  );
}