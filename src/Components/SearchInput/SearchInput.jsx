import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./SearchInput.css";
const SearchInput = forwardRef(({ onSearch, isLoading }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        type="text"
        placeholder="Digite a cidade da previsão do tempo"
      />
      <button onClick={onSearch} disabled={isLoading}>
        {isLoading ? "Buscando..." : "Buscar"}
      </button>
    </div>
  );
});

// Definindo o nome do componente
SearchInput.displayName = "SearchInput";

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired, // onSearch é uma função obrigatória
  isLoading: PropTypes.bool.isRequired, // isLoading é um booleano obrigatório
};

export default SearchInput;
