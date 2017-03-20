function BuildStatus(jenkinsModel)
{
    this.description = jenkinsModel.description;
    this.result = jenkinsModel.result;
    this.properties = { };
    this.parameters = { };

    const propertiesNode = jenkinsModel.actions.find(action => !!action.properties);
    if (propertiesNode)
    {
        propertiesNode.forEach(property =>
        {
            this.properties[property.name] = property.value;
        });
    }

    const parametersNode = jenkinsModel.actions.find(action => !!action.parameters);
    if (parametersNode)
    {
        parametersNode.parameters.forEach(parameter =>
        {
            this.parameters[parameter.name] = parameter.value;
        });
    }
}

module.exports = BuildStatus;