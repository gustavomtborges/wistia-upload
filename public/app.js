;(function () {
  'use strict'
  angular.module('app', [])
    .controller('UploadController', UploadController)
    .directive('wistiaUpload', WistiaUpload)

  // Upload controller
  function UploadController ($scope, $http, $sce) {
    var controller = this
    controller.started = false

    controller.startUpload = function () {
      controller.started = true
      $('#fileupload').fileupload({
        url: 'https://upload.wistia.com/',
        dataType: 'json',
        done: function (e, data) {
          controller.videoId = data.result.hashed_id
          controller.videoUrl = $sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/' + controller.videoId)
          controller.started = false
          controller.videoDone = true
          $scope.$apply()
        },
        progressall: function (e, data) {
          controller.progress = parseInt(data.loaded / data.total * 100, 10)
          $('.progress-bar').css('width', controller.progress + '%')
        },
        formData: {api_password: '392f8c278859df78c52b19da0f82910e112c02a865eeccb85461bef8b83e3a7d'}
      })
    }
  }

  // Wistia directive
  function WistiaUpload () {
    return {
      restrict: 'E',
      controller: 'UploadController',
      controllerAs: 'uploadCtrl',
      template: '<div class="container" style="margin-top: 5em">' +
        '<div class="row">' +
        '    <div class="col-lg-10 col-lg-offset-1">' +
        '        <div class="panel panel-default">' +
        '            <div class="panel-heading">Video Upload</div>' +
        '            <div class="panel-body">' +
        '                <span class="btn btn-primary fileinput-button">' +
        '                    <i class="glyphicon glyphicon-plus"></i>' +
        '                    <span>Select video...</span>' +
        '                <input id="fileupload" type="file" name="files" ng-click="uploadCtrl.startUpload()">' +
        '                </span>' +
        '<p>Select .mp4 format</p>' +
        '                <br />' +
        '                <br />' +

        '                <div ng-show="uploadCtrl.started">' +
        '                    <div class="progress">' +
        '                        <div class="progress-bar" role="progressbar" aria-valuenow="{{uploadCtrl.progress}}" aria-valuemin="0" aria-valuemax="100">' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +

        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>' +
        '<hr />' +
        '<div class="row">' +
        '    <div class="col-lg-10 col-lg-offset-1">' +
        '      <div ng-show="uploadCtrl.videoDone">' +
        '      <iframe ng-src="{{uploadCtrl.videoUrl}}" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="620" height="349"></iframe>' +
        '       <script src="//fast.wistia.net/assets/external/E-v1.js" async></script>' +
        '        ' +
        '      </div>' +
        '    </div>' +
        '</div>' +
        '</div>'
    }
  }
})()
