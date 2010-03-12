
// Some global variables indicating metadata about the property.  Many
// functions use these.
var locality = jQuery.trim($('#address_line_2 .locality').text());
var county = jQuery.trim($('#county_id').text());
var region = jQuery.trim($('#address_line_2 .region').text());

function GetParcelNumber() {
  return jQuery.trim($('#public_data td.property_detail_label:contains("APN:") + td.property_detail_value').text());
};

// Adds the given label/value pair to the property details panel on
// the left side of the page.
function AddPropertyDetail(name, valueHtml) {
  $('#property_basic_details>tbody').append(
    '<tr>' +
    '<td class="property_detail_label left_column">' + name + ':</td>' +
    '<td class="property_detail_value right_column">' + valueHtml + '</td>' +
    '</tr>');
};

// Adds the given label/value pair to the middle column of the public
// facts panel lower in the page.
function AddPublicData(name, valueHtml) {
  $('#public_data .property-details:nth-child(2)>tbody').append(
    '<tr>' +
    '<td class="property_detail_label">' + name + ':</td>' +
    '<td class="property_detail_value">' + valueHtml + '</td>' +
    '</tr>');
};

function AddWalkscore() {
  // The Walkscore API would give us the score directly, but we'd need
  // to apply for an API key (which may be denied), and we'd need to
  // provide the geographic coordinates instead of the address.
  var addr = jQuery.trim($('#address_line_1').text()) + ', ' +
    jQuery.trim($('#address_line_2').text());
  var url = 'http://www.walkscore.com/get-score.php?street=' +
    encodeURIComponent(addr) + '&go=Go';
  var link = '<a href="' + url + '" target="_new">Show Walkability</a>';
  AddPropertyDetail('Walkability', link);
};

// If the property is located in King County, WA, adds a link to the
// King County Parcel Viewer for this property.
function AddKingCountyParcelViewer() {
  if (county == 'King' && region == 'WA') {
    var parcel = GetParcelNumber();
    if (/\d{10}/.test(parcel)) {
      var url = 'http://www5.kingcounty.gov/ParcelViewer?PIN=' + parcel;
      var link = '<a href="' + url + '" target="_new">' + parcel + '</a>';
      AddPublicData('Parcel Viewer', link);
    }
  }
};

// If the property is located in Kirkland, WA, adds a link to the
// Kirkland permits site for this property.
function AddKirklandPermits() {
  if (locality == 'Kirkland' && region == 'WA') {
    var parcel = GetParcelNumber();
    if (/\d{10}/.test(parcel)) {
      var formatted_parcel = parcel.replace(/(\d{6})(\d{4})/, '$1-$2');
      var url = 'http://www.kirklandpermits.net/tm_bin/tmw_cmd.pl?tmw_cmd=ParcelViewParcel&shl_prc_parcel_no=' + formatted_parcel;
      var link = '<a href="' + url + '" target="_new">' + 'Show Permits</a>';
      AddPublicData('Kirkland Permits', link);
    }
  }
};

AddWalkscore();
AddKingCountyParcelViewer();
AddKirklandPermits();
