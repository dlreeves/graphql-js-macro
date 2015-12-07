var GraphQLParser;
let graphql = macro {
  case { _ $query } => {
    // Transform AST to string value
    var query_string = unwrapSyntax(#{$query}[0]);

    // Parse string to GraphQL AST
    GraphQLParser = require('./node_modules/graphql/language/parser.js');
    var query_ast = GraphQLParser.parse(query_string, { noSource: true, noLocation: true});

    // Transform GraphQL AST to JSON
    var query_json = "(" + JSON.stringify(query_ast) + ")";

    // Transform JSON to Syntax
    var query_syntax = parser.read(query_json);
    // remove the EOF token
    query_syntax.pop();
    return query_syntax;
  }
}

export graphql;