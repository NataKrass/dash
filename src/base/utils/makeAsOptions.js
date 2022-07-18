export default function makeAsOptions (list = [{}], valueKey = 'id', labelKey = 'label') {
  return list.map(idItem => ({
    value: idItem?.[valueKey],
    label: idItem?.[labelKey]
  }));
}
